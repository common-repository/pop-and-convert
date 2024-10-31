import { Toggle, ConditionForm, Tooltip, Icon } from "../../../components";
import { useState } from "react";

function Conditional() {


    const [isChecked, setIsChecked] = useState(true);

    const handleToggleChange = () => {
        setIsChecked(!isChecked)
    };

    return (
        <div className="p-5 rounded gap-8 flex flex-col bg-white box-shadow">
            <div className="flex gap-9">
                <div className="label self-start">
                    <p className='title'>Enable Logic </p>
                    <Tooltip content={'Enable/Disable Logic '} direction="left">
                        <Icon icon={'help'} />
                    </Tooltip>
                </div>
                <div className="flex-1">

                    <div className="flex gap-9">
                        <Toggle
                            type="checkbox"
                            checked={isChecked}
                            value={isChecked}
                            onChange={(e) => {
                                handleToggleChange()
                            }}
                        />
                    </div>

                    {isChecked && (
                        <div className="condition-form">
                            <p className="condition-label mt-3">Conditions</p>
                            <ConditionForm />
                            <div className="divider text-center">OR</div>
                            <ConditionForm />
                        </div>
                    )
                    }

                </div>
            </div>
        </div>
    );
}

export default Conditional;
