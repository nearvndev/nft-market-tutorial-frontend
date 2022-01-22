import React, { useState } from "react";
import { Modal, Input, Divider, Radio } from "antd";

function ModalSale(props) {
    const [price, setPrice] = useState(0);
    const [token, setToken] = useState("NEAR");

    function handleOk() {
        props.handleOk(token, price);
    }

    function handleTokenChange(e) {
        setToken(e.target.value);
    }

    return (
        <Modal title="Sale NFT" visible={props.visible} onOk={handleOk} onCancel={props.handleCancel}>
            <div style={{marginBottom: 30}}>
                <span style={{marginBottom: 10, display: "block"}}>Select token ({token}):</span>
                <Radio.Group value={token} onChange={handleTokenChange}>
                    <Radio.Button value="NEAR">NEAR</Radio.Button>
                    <Radio.Button value="VBIC">VBIC</Radio.Button>
                </Radio.Group>
            </div>
            <div>
                <span style={{marginBottom: 10,  display: "block"}}>Input price ({token}):</span>
                <Input type={"number"} onChange={(e) => setPrice(e.target.value)} placeholder={"ex: 1000 ..."} size="large" />
            </div>
        </Modal>
    )
}

export default ModalSale