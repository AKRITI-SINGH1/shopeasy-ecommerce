import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { Link } from "react-router-dom";
import { useState } from "react"; 

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
    const [formData, setFormData] = useState(initialState);

    function onSubmit(e) {
        e.preventDefault();
        // Handle form submission
        console.log('Register Form Data:', formData);
    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Create new account
                </h1>
                <p className="mt-2">
                    Already have an account!
                    <Link to="/auth/login"
                        className="font-medium ml-2 text-primary hover:underline">
                        Login
                    </Link>
                </p>
            </div>
            <CommonForm
                formControls={registerFormControls}
                ButtonText={"Sign Up"} 
                formData={formData}
                setFormData={setFormData}
                OnSubmit={onSubmit}
            />
        </div>
    );
}

export default AuthRegister;
