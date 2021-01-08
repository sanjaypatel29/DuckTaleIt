import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EditStudent } from './EditStudent';

export default function Edit(props) {
    const id = props.match.params.id;
    const [data, setData] = useState([]);
    useEffect(
        () => {
            axios
                .get(`http://localhost:5000/studentDataId?id=${id}`)
                .then((res) => {
                    setData([res.data]);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        [id]
    );

    if (data.length > 0) {
        return (
            <EditStudent data={data[0]} />
        );
    }
    else {
        return (
            <div>hi</div>
        );
    }

}
