import React, { useState } from 'react';
import { DatePicker, Select, Space } from 'antd';

interface SwitchablePickerProps {
    onChange: Function;
}

const SwitchablePicker: React.FC<SwitchablePickerProps> = (props) => {
    const [type, setType] = useState('date');
    const { Option } = Select;

    function PickerWithType({ type, onChange }) {
        if (type === 'date') return <DatePicker onChange={onChange} />;
        return <DatePicker picker={type} onChange={onChange} />;
    }
    return (
        <Space>
            <Select value={type} onChange={setType}>
                <Option value="date">日</Option>
                <Option value="month">月</Option>
                {/* <Option value="year">Year</Option> */}
            </Select>
            <PickerWithType type={type} onChange={value => console.log(value)} />
        </Space>
    );
}

export default SwitchablePicker;