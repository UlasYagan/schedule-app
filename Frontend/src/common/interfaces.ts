
export interface INotification {
    isOpen: boolean,
    message: string,
    type: string
};

export interface IConfirmDialog {
    isOpen: boolean,
    title: string,
    subTitle: string
};

export interface ITodos{
    todoId?: number
    todoName?: string
    days?: number
    timeless?: number
    startDate?: string
    endDate?: string   
    isActive?: number
}

export interface ITodoTasks{
    id?: number
    todoName?: string
    todoDate?: string   
    isCompleted: number
}
