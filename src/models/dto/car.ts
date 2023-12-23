interface CarRequest {
    user_id: number,
    name: string;
    price: number,
    size: string,
    picture?: Express.Multer.File,
    updatedAt: number,
}


export { CarRequest };
