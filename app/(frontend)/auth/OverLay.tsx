import classes from './OverLay.module.css'


export default function OverLay({children}: {children: React.ReactNode}) {
  return (
    <div className={classes.sky}>
      <div className={classes.photo}>
      {children}
      </div>
    </div>
  )
}
