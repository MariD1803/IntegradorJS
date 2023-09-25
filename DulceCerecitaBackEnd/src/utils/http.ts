interface DictInterface{
    [key: string]: string;
}

const HTTPErrorMessageDict: DictInterface = {
    idMustBeNumericErrorMsg: 'id tiene que ser un dato numerico'
}

export {HTTPErrorMessageDict}