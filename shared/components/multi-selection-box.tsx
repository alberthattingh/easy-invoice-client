import { View } from 'react-native';
import React, { useState } from 'react';
import { List, TextInput } from 'react-native-paper';
import { SelectableItem } from '../models/selectable-item';

interface Props {
    label: string;
    list: SelectableItem[];
    selected: SelectableItem[];
    setSelected: (selectedItems: SelectableItem[]) => void;
}

export default function MultiSelectionBox(props: Props) {
    const { label, list, selected, setSelected } = props;
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const [dropdownIcon, setDropdownIcon] = useState<string>('chevron-down');

    const displayText = selected.length ? `${selected.length} selected` : '';

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
        setDropdownIcon(dropdownVisible ? 'chevron-down' : 'chevron-up');
    };

    const checkboxIcon = (item: SelectableItem) => {
        return selected.map((selectedItem) => selectedItem.key).includes(item.key)
            ? 'check-box-outline'
            : 'checkbox-blank-outline';
    };

    const toggleItemSelection = (item: SelectableItem) => {
        const inSelection = selected.map((selectedItem) => selectedItem.key).includes(item.key);
        if (inSelection) {
            setSelected(selected.filter((selectedItem) => selectedItem.key !== item.key));
        } else {
            setSelected([...selected, item]);
        }
    };

    return (
        <View>
            <TextInput
                disabled
                mode="outlined"
                label={label}
                value={displayText}
                right={<TextInput.Icon name={dropdownIcon} onPress={() => toggleDropdown()} />}
            />
            {dropdownVisible && (
                <View>
                    {list.map((selectable) => (
                        <List.Item
                            key={selectable.key}
                            title={selectable.label}
                            left={(props) => <List.Icon {...props} icon={checkboxIcon(selectable)} />}
                            onPress={() => toggleItemSelection(selectable)}
                        />
                    ))}
                </View>
            )}
        </View>
    );
}
