

const BlurCircle = ({top="auto",left="auto", right="auto",bottom ="auto"}) => {
  return (
    <div className="absolute -z-50 h-[250px] w-[250px] aspect-square rounded-full bg-[rgba(255,0,0,0.3)] blur-[100px]"

      
      style={{top: top, left: left, right: right, bottom: bottom }}>
    </div>
  )
}

export default BlurCircle
