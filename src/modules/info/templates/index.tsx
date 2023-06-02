import React from "react"

type InfoTemplateProps = {
  title: string,
  text: JSX.Element
}

const InfoTemplate: React.FC<InfoTemplateProps> = ({
  title, text,
}) => {
  return (
    <div className="py-6 mt-2 mb-6 px-2">
      <div className="content-container flex flex-col items-center">
        {title &&
          <div className="text-2xl font-bold mb-10 uppercase">
            {title}
          </div>
        }
        <div className="max-w-4xl h-full w-full flex flex-col gap-5 text-sm">
          {text}
        </div>
      </div>
    </div>
  )
}

export default InfoTemplate
