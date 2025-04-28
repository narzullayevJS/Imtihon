import type { Request, Response } from "express";
export declare const createBlog: (req: Request, res: Response) => Promise<void>;
export declare const getMyBlogs: (req: Request, res: Response) => Promise<void>;
export declare const getMyJoinedBlogs: (req: Request, res: Response) => Promise<void>;
export declare const getBlogInfo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateBlog: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteBlog: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const searchBlogs: (req: Request, res: Response) => Promise<void>;
export declare const joinBlog: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const leaveBlog: (req: Request, res: Response) => Promise<void>;
export declare const getBlogUsers: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=blog.controller.d.ts.map