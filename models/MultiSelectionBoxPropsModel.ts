export interface SelectableItem {
    label: string;
    key: number;
    value: any;
}

export interface MultiSelectionBoxPropsModel {
    label: string;
    list: SelectableItem[];
    selected: SelectableItem[];
    setSelected: (selectedItems: SelectableItem[]) => void;
}
