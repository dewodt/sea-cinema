import { Toaster, ToastBar, toast } from "react-hot-toast";

const CustomToaster = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        loading: {
          className:
            "border-[3px] border-custom-dark-gray font-inter font-medium",
        },
        success: {
          className: "border-[3px] border-custom-green font-inter font-medium",
          iconTheme: { primary: "#3FB160", secondary: "#FFFFFF" },
        },
        error: {
          className:
            "border-[3px] border-custom-light-red font-inter font-medium",
          iconTheme: { primary: "#EF1B27", secondary: "#FFFFFF" },
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" && (
                <button onClick={() => toast.dismiss(t.id)}>
                  <svg
                    width="49"
                    height="49"
                    viewBox="0 0 49 49"
                    className="h-[12px] w-[12px] fill-[#363636]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_334_807)">
                      <path d="M11.8885 6.44479C11.4762 6.44479 11.0635 6.60182 10.7494 6.91679L7.52715 10.139C6.8972 10.769 6.8972 11.7889 7.52715 12.4172L19.2769 24.167L7.52715 35.9168C6.8972 36.5467 6.8972 37.5667 7.52715 38.195L10.7494 41.4172C11.3793 42.0472 12.3992 42.0472 13.0276 41.4172L24.7774 29.6674L36.5271 41.4172C37.1555 42.0472 38.177 42.0472 38.8054 41.4172L42.0276 38.195C42.6575 37.5651 42.6575 36.5451 42.0276 35.9168L30.2778 24.167L42.0276 12.4172C42.6575 11.7889 42.6575 10.7673 42.0276 10.139L38.8054 6.91679C38.1754 6.28685 37.1555 6.28685 36.5271 6.91679L24.7774 18.6666L13.0276 6.91679C12.7126 6.60182 12.3007 6.44479 11.8885 6.44479Z" />
                    </g>
                    <defs>
                      <clipPath id="clip0_334_807">
                        <rect
                          width="48.3333"
                          height="48.3333"
                          transform="translate(0.61084)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

export default CustomToaster;
