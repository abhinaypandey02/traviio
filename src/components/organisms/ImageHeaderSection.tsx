import React from 'react'

const ImageHeaderSection = () => {
  return (
    <div>
      <div>
        <img
          className="w-full  max-h-[500px]"
          src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=2000"
          alt=""
        />
        <h2 className="text-4xl  text-white -translate-y-20  font-extrabold text-center ">Egypt</h2>
      </div>
      <div className="px-10 text-sm opacity-80">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
      </div>
    </div>
  )
}

export default ImageHeaderSection
