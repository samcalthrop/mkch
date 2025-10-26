"use strict";
/*
 * Copyright 2023 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitPathsBySizeLoader = void 0;
const change_case_1 = require("change-case");
const iconTypes_1 = require("../iconTypes");
/**
 * A dynamic loader for icon paths that generates separate chunks for the two size variants.
 */
const splitPathsBySizeLoader = async (name, size) => {
    const key = (0, change_case_1.pascalCase)(name);
    let pathsRecord;
    if (size === iconTypes_1.IconSize.STANDARD) {
        pathsRecord = await Promise.resolve().then(() => __importStar(require(
        /* webpackChunkName: "blueprint-icons-16px-paths" */
        "../generated/16px/paths")));
    }
    else {
        pathsRecord = await Promise.resolve().then(() => __importStar(require(
        /* webpackChunkName: "blueprint-icons-20px-paths" */
        "../generated/20px/paths")));
    }
    return pathsRecord[key];
};
exports.splitPathsBySizeLoader = splitPathsBySizeLoader;
//# sourceMappingURL=splitPathsBySizeLoader.js.map