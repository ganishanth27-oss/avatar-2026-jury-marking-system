import neitLogo from "../assets/neit-logo.png";
import avatarLogo from "../assets/avatar-logo.png";

function AVATARHeader() {
  return (
    <div className="relative w-full max-w-[1250px] mx-auto px-5 py-7">

      <div className="relative flex items-center justify-center min-h-[145px]">

        {/* NEIT Logo */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2">

          <div className="w-[90px] h-[90px] md:w-[110px] md:h-[110px] bg-white rounded-2xl p-3 shadow-2xl flex items-center justify-center">

            <img
              src={neitLogo}
              alt="NEIT Logo"
              className="w-full h-full object-contain"
            />

          </div>

        </div>


        {/* Center Branding */}
        <div className="text-center px-24 md:px-40">

          <h2 className="text-sm md:text-lg font-semibold tracking-[0.18em] text-white uppercase">

            NEHRU INSTITUTE OF ENGINEERING AND TECHNOLOGY

          </h2>

          <h1 className="mt-3 text-3xl md:text-5xl font-black tracking-wide text-white">

            NEHRU GRAND KACHERI

          </h1>

          <p className="mt-3 text-lg md:text-2xl font-bold tracking-[0.35em] text-emerald-400">

            AVATAR 2026

          </p>

        </div>


        {/* AVATAR Logo */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2">

          <div className="w-[90px] h-[90px] md:w-[110px] md:h-[110px] bg-white rounded-2xl p-3 shadow-2xl flex items-center justify-center">

            <img
              src={avatarLogo}
              alt="AVATAR Logo"
              className="w-full h-full object-contain"
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default AVATARHeader;

