import React, { useState } from "react";
import { Modal, Input, Divider } from "antd";

function ModalSale(props) {
    const [price, setPrice] = useState(0);

    function handleOk() {
        props.handleOk(price);
    }

    return (
        <Modal title="Sale NFT" visible={props.visible} onOk={handleOk} onCancel={props.handleCancel}>
            <h2>Input price (NEAR):</h2>
            <Input type={"number"} onChange={(e) => setPrice(e.target.value)} placeholder={"ex: 1 NEAR ..."} size="large" />
        </Modal>
    )
}

export default ModalSale