import type { Request, Response } from "express";
export declare const createComment: (req: Request, res: Response) => Promise<void>;
export declare const updateComment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteComment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=coment.controller.d.ts.map