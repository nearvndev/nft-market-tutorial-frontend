import React, { useState } from "react";
import { Modal, Input, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";

function ModalTransferNFT(props) {
    const [accountId, setAccountId] = useState("");

    function handleOk() {
        props.handleOk(accountId);
    }

    return (
        <Modal title="Transfer NFT" visible={props.visible} onOk={handleOk} onCancel={props.handleCancel}>
            <h2>Transfer to:</h2>
            <Input onChange={(e) => setAccountId(e.target.value)} placeholder={"ex: vbidev.testnet ..."} size="large" prefix={<UserOutlined />} />
        </Modal>
    )
}

export default ModalTransferNFT