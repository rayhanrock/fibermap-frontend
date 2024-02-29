import { toast } from "react-toastify";

const handleError = (error) => {
  const showError = (data) => {
    Object.entries(data).forEach(([key, value]) => {
      if (key == "non_field_errors") {
        toast.error(value[0]);
      } else {
        if (key == "message") {
          toast.error(value);
        } else {
          if (typeof value == "string") {
            toast.error(
              key.charAt(0).toUpperCase() + key.slice(1) + " : " + value
            );
          } else {
            if (Array.isArray(value)) {
              toast.error(
                key.charAt(0).toUpperCase() + key.slice(1) + " : " + value[0]
              );
              return;
            }
            console.log("fdfd", value);
            showError(value);
          }
        }
      }
    });
  };
  if (error.request && error.request.status === 500) {
    toast.error("Internal Server Error");
  } else if (error.response && error.response.data) {
    showError(error.response.data);
  } else {
    toast.error(error.message);
  }
};

export default handleError;
