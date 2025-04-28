interface Blog {
    id?: number;
    title: string;
    description?: string;
    owner_id: number;
}
export declare const createBlog: (blog: Blog) => Promise<any>;
export declare const getBlogsByUserId: (userId: number) => Promise<any[]>;
export declare const getJoinedBlogs: (userId: number) => Promise<any[]>;
export declare const getBlogById: (id: number) => Promise<any>;
export declare const updateBlog: (id: number, title: string, description: string) => Promise<any>;
export declare const deleteBlog: (id: number) => Promise<boolean>;
export declare const searchBlogs: (searchTerm: string) => Promise<any[]>;
export declare const joinBlog: (blogId: number, userId: number) => Promise<any>;
export declare const leaveBlog: (blogId: number, userId: number) => Promise<boolean>;
export declare const getBlogUsers: (blogId: number) => Promise<any[]>;
export declare const isBlogOwner: (blogId: number, userId: number) => Promise<boolean>;
export declare const isBlogMember: (blogId: number, userId: number) => Promise<boolean>;
export {};
//# sourceMappingURL=blog.model.d.ts.map