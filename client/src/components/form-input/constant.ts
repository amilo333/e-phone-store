import Checkbox from "./checkbox";
import Select from "./select";
import TextField from "./text-field";

// [Const] Input types
export const InputType = {
  InputText: "text",
  InputPassword: "password",
  InputNumber: "number",
  InputRadio: "radio",
  InputCheckbox: "checkbox",
  InputSwitch: "switch",
  InputSelect: "select",
  InputTextArea: "textarea",
  InputDate: "date",
};

// [Const] Input components based on input type
export const InputComponent = {
  [InputType.InputText]: {
    Component: TextField,
  },
  [InputType.InputCheckbox]: {
    Component: Checkbox,
  },
  [InputType.InputSelect]: {
    Component: Select,
  },
};
