import { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image, Alert, Dimensions, Modal, Pressable } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";

import { styles } from "../../assets/styles/add";

export default function TakePhoto(props) {
  const ref = useRef(null);
  const { width, height } = Dimensions.get("window");
  const ALBUM_NAME = "publicData";
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [modalVisible, setModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [photoIng, setPhotoIng] = useState(true);

  const [image, setImage] = useState("");
  const [propsImg, setPropsImg] = useState(props.value);

  // 갤러리에서 이미지 선택
  const uploadImg = async (name) => {
    setModalVisible(false);
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });
    SaveImg(name, result.uri, result.base64);
  };

  // 이미지 저장
  const SaveImg = (name, uri, base64) => {
    if (name === props.name) {
      setImage(uri);
      props.getImage(base64, props.name);
    }
  };

  // 이미지 취소
  const cancleImg = (name) => {
    if (name === props.name) {
      setImage("");
      setPropsImg("");
      // props.getImage(null, props.name);
      props.getImage("", props.name);
    }
  };

  //카메라 활성화
  const onCamera = async (name) => {
    setPhotoName(name);
    setModalVisible(false);
    setPhotoIng(true);
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  if (hasPermission === true && photoIng) {
    return (
      <View style={{ flex: 1 }}>
        <Modal transparent={true} visible={photoIng}>
          <Camera
            style={{
              flex: 1,
              width: width,
              height: height,
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              alignSelf: "center",
            }}
            ref={ref}
            type={CameraType.back}
          >
            <View style={styles.cameraContainer}>
              <TouchableOpacity
                onPress={async () => {
                  const options = { quality: 1, base64: true };
                  const data = await ref.current.takePictureAsync(options);
                  if (data.uri) {
                    SaveImg(photoName, data.uri, data.base64);
                    setPhotoIng(false);
                    try {
                      const { status } = await requestPermission();
                      if (status === "granted") {
                        const asset = await MediaLibrary.createAssetAsync(data.uri);
                        // let album = await MediaLibrary.getAlbumAsync(ALBUM_NAME);
                        if (album === null) {
                          album = await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset);
                        } else {
                          await MediaLibrary.addAssetsToAlbumAsync([asset], album.id);
                        }
                      } else {
                        setHasPermission(false);
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }
                }}
              >
                <View style={styles.camera}>
                  <FontAwesome color="white" name="circle" size={70} />
                </View>
              </TouchableOpacity>
            </View>
          </Camera>
        </Modal>
      </View>
    );
  }
  if (hasPermission === false) {
    return <Alert>카메라 접근 권한을 허용해주세요</Alert>;
  }
  const OpenModal = (name) => {
    setModalVisible(true);
    setPhotoName(name);
  };
  // console.log(propsImg);
  return (
    <>
      <View style={styles.img_container}>
        <Text style={styles.img_container_title}>{props.title}</Text>
        {propsImg ? (
          <View>
            <TouchableOpacity style={styles.imgcancle} onPress={() => cancleImg(props.name)}>
              <AntDesign style={styles.icon} color="red" name="minuscircle" size={30} />
            </TouchableOpacity>
            <Image
              source={{
                uri: propsImg,
              }}
              style={styles.imgchoose}
            />
          </View>
        ) : image ? (
          <View>
            <TouchableOpacity style={styles.imgcancle} onPress={() => cancleImg(props.name)}>
              <AntDesign style={styles.icon} color="red" name="minuscircle" size={30} />
            </TouchableOpacity>
            <Image source={{ uri: image }} style={styles.imgchoose} />
          </View>
        ) : (
          <View>
            <TouchableOpacity style={styles.imgchoose} onPress={() => OpenModal(props.name)}>
              <AntDesign style={styles.icon} color="white" name="pluscircle" size={30} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.centeredView}>
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable style={styles.modalBtn} onPress={() => uploadImg(photoName)}>
                <Text style={styles.textStyle}>사진 보관함</Text>
              </Pressable>
              <Pressable style={styles.modalBtn} onPress={() => onCamera(photoName)}>
                <Text style={styles.textStyle}>사진 찍기</Text>
              </Pressable>
              <Pressable style={styles.modalCloseBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.CloseStyle}>닫기</Text>
                <AntDesign style={styles.icon} color="tomato" name="close" size={20} />
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}
