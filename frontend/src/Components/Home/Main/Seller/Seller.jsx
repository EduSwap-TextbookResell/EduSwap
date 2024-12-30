export default function Seller() {
  return (
    <div className="h-[73vh] w-full">
      <div className="m-auto h-[55%]">
        <div className="m-auto mb-5 flex h-[90%] w-[75%] rounded-3xl bg-light_background shadow-lg">
          <div className="ml-6 mt-10 flex h-[75%] w-[25%] items-center justify-center rounded-3xl bg-light_coral shadow-xl">
            <div className="relative flex h-full w-full items-center justify-center">
              <div
                className="absolute h-[1.5vh] w-[2.5vw] rotate-90 rounded-3xl bg-dark_coral shadow-inner"
                style={{ boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.4)' }}
              ></div>
              <div
                className="absolute h-[1.5vh] w-[2.5vw] rounded-3xl bg-dark_coral shadow-inner"
                style={{ boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.4)' }}
              ></div>
            </div>
          </div>
        </div>
        <hr style={{ borderColor: '#E9E9E9', borderWidth: '2px' }} />
      </div>
      <div className="text-center text-light_coral text-xl mt-3">
        Moje wystawione książki
      </div>
    </div>
  );
}
