import React, { useState } from "react";
import { Modal, Input, Divider } from "antd";

function ModalMintNFT(props) {
    const [tokenId, setTokenId] = useState("");
    const [tokenTitle, setTokenTitle] = useState("");
    const [description, setDescription] = useState("");
    const [media, setMedia] = useState("");

    function handleOk() {
        props.handleOk({
            tokenId, tokenTitle, description, media
        });
    }

    return (
        <Modal title="Mint NFT" visible={props.visible} onOk={handleOk} onCancel={props.handleCancel}>
            <span>Token Id:</span>
            <Input onChange={(e) => setTokenId(e.target.value)} style={{marginBottom: 15}}/>
            <span>Title:</span>
            <Input onChange={(e) => setTokenTitle(e.target.value)} style={{marginBottom: 15}}/>
            <span>Description:</span>
            <Input onChange={(e) => setDescription(e.target.value)} style={{marginBottom: 15}}/>
            <span>Media:</span>
            <Input onChange={(e) => setMedia(e.target.value)} style={{marginBottom: 15}} />
        </Modal>
    )
}

export default ModalMintNFT