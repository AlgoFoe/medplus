const Home = async () => {
  return (
    <>
      <div className="grid grid-cols-12 grid-rows-12 gap-5 p-4 box-border min-h-screen rounded-lg">
        <div className="col-span-8 row-span-6 rounded-lg rounded-tl-[18px] p-4 bggrad">Box 1</div>
        <div className=" col-span-4 row-span-4 rounded-lg  rounded-tr-[18px] p-4 bggrad ">Box 2</div>
        <div className=" col-span-4 row-span-2 rounded-lg p-4 bggrad ">Box 3</div>
        <div className=" col-span-5 row-span-6 rounded-lg rounded-bl-[18px] p-4 bggrad ">Box 4</div>
        <div className=" col-span-7 row-span-6 rounded-lg rounded-br-[18px] p-4 bggrad ">Box 5</div>
    </div>
    </>
  )
}

export default Home