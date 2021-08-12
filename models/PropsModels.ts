import { TimeObjectModel } from './TimeObjectModel';

export interface CustomTimePickerPropsModel {
    label: string;
    selectedTime: TimeObjectModel;
    setSelectedTime: (time: TimeObjectModel) => void;
}
