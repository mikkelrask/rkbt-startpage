import { FC } from 'react';


const Props = {
    text: String,
    date: String,
};

const todaysDate = new Date().toString();

const UpdatedAt: FC<Props> = ({ text, date }) => {
    return (
        <div className="updatedAt">
            <span>{text}</span>
            <span>{todaysDate}</span>
        </div>
    );
}

export default UpdatedAt;