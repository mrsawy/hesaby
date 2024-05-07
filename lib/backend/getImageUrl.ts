import s3 from "@/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export default async function getUrl({
  data,
  key,
}: {
  data: any[];
  key: string | undefined | null;
}) {
  try {
    let result: any[] = [];
    const promises = data.map(async (d: any) => {
      try {
        if (!key) {
          result.push({ ...d, imgUrl: `/image_placeholder.jpg` });
          // return;
        } else {
          let command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: d[key] as string,
          });
          const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });
          result.push({ ...d, imgUrl: url });
        }
      } catch (err) {
        console.log(err);
      }
    });
    await Promise.all(promises);

    return result;
  } catch (error) {
    console.log(error);
    
  }
}

export async function getSingleUrl({ key }: { key: string | null | undefined }) {
  try {
    if (!key) {
      return `/image_placeholder.jpg`;
    }
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    });
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });

    return url;
  } catch (error) {
    console.log(error);
    throw error; // Throw the error so the caller can handle it
  }
}


export async function getCoverUrl({ key }: { key: string | null | undefined }) {
  try {
    if (!key) {
      return `/cover_placholder.jpg`;
    }
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    });
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });

    return url;
  } catch (error) {
    console.log(error);
    throw error; // Throw the error so the caller can handle it
  }
}
