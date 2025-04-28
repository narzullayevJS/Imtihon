import type { Request, Response } from "express";
export declare const createPost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllPosts: (req: Request, res: Response) => Promise<void>;
export declare const getPostById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updatePost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deletePost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const sortPostsByDate: (req: Request, res: Response) => Promise<void>;
export declare const getPostComments: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=post.controller.d.ts.map