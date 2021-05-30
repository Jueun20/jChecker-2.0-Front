export interface RouteParamsProps {
    id: string,
    token?: string,
}

export interface ClassDataProps {
    grading?: Object,
}


export interface ClassroomProps {
    token: string,
    className: string,
    instructor: string,
    createDate: string,
}

export interface ClassroomInstProps {
    itoken: string,
    className: string,
    instructor: string,
    createDate: string,
}

export interface ClassroomInstTokenProps {
    itoken: string,
}

export type Order = 'asc' | 'desc';

export interface EnhancedTableProps {
    order: Order,
    orderBy: string,
    keyGroup: string[],
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ResultKeyProps) => void,
}

export interface ResultKeyProps {
    studentNum: string,
    result: number,
}

export interface GradingResultProps {
    [key: string]: GradingResultProps,
    id: string,
    token: string,
    isDirect: string,
    studentNum: string,
    className: string,
    gradingDate: string,
    result: number,
    point: number,
    count: {
        deductedPoint: number,
    } | undefined,
    delay: {
        deductedPoint: number,
    } | undefined,
    compile: {
        deductedPoint: number,
    } | undefined,
    oracle: {
        deductedPoint: number,
    } | undefined,
    classes: {
        deductedPoint: number,
    } | undefined,
    packages: {
        deductedPoint: number,
    } | undefined,
    customException: {
        deductedPoint: number,
    } | undefined,
    customStructure: {
        deductedPoint: number,
    } | undefined,
    inheritInterface: {
        deductedPoint: number,
    } | undefined,
    inheritSuper: {
        deductedPoint: number,
    } | undefined,
    overriding: {
        deductedPoint: number,
    } | undefined,
    overloading: {
        deductedPoint: number,
    } | undefined,
    thread: {
        deductedPoint: number,
    } | undefined,
    javadoc: {
        deductedPoint: number,
    } | undefined,
    encapsulation: {
        deductedPoint: number,
    } | undefined,
}