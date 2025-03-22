import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken'); // Import the library
import * as dotenv from "dotenv";

dotenv.config();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedException("Access Denied: No token provided");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      console.log("decoded", decoded);
      req["user"] = decoded; // Attach user data to request object
      next();
    } catch (error) {
      throw new UnauthorizedException("Access Denied: Invalid token");
    }
  }
}
