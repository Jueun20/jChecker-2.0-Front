export interface DialogRawProp {
    keepMounted: boolean;
    open: boolean;
    onCreate: Function;
    onClose: Function;
    onSubmit: Function;
    initial: DialogCountProp;
}

export interface DialogRawCountProp {
    keepMounted: boolean;
    open: boolean;
    onCreate: Function;
    onClose: Function;
    onSubmit: Function;
    initial: DialogCountProp;
}

export interface DialogRawCompileProp {
    keepMounted: boolean;
    open: boolean;
    onCreate: Function;
    onClose: Function;
    onSubmit: Function;
    initial: DialogCompileProp;
}

export interface DialogRawOracleProp {
    keepMounted: boolean;
    open: boolean;
    onCreate: Function;
    onClose: Function;
    onSubmit: Function;
    initial: DialogOracleProp;
}

export interface DialogRawUtilProp {
    keepMounted: boolean;
    open: boolean;
    onCreate: Function;
    onClose: Function;
    onSubmit: Function;
    initial: DialogUtilProp;
}

export interface DialogRawInterfaceOrSuperClassProp {
    keepMounted: boolean;
    open: boolean;
    onCreate: Function;
    onClose: Function;
    onSubmit: Function;
    initial: DialogInterfaceOrSuperClassProp;
}

export interface DialogRawCheckUtilProp {
    keepMounted: boolean;
    open: boolean;
    onCreate: Function;
    onClose: Function;
    onSubmit: Function;
    initial: DialogCheckUtilProp;
}



export interface DialogCountProp {
    state: boolean,
    methodCount: number,
    fieldCount: number,
    enForCount: number,
    deductPoint: number,
}

export interface DialogCompileProp {
    state: boolean,
    buildTool: boolean,
    deductPoint: number,
}

export interface DialogOracleProp {
    state: boolean,
    input: string[],
    output: string[],
    checksum: string[],
    filePath: string[],
    deductPoint: number,
    maxDeduct: number,
}

export interface DialogInterfaceOrSuperClassProp {
    state: boolean,
    origins: string[],
    inherit: string[],
    deductPoint: number,
    maxDeduct: number,
}

export interface DialogUtilProp {
    state: boolean,
    required: string[],
    deductPoint: number,
    maxDeduct: number,
}

export interface DialogCheckUtilProp {
    state: boolean,
    deductPoint : number,
}