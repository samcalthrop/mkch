"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookmark = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
/*
 * Copyright 2024 Palantir Technologies, Inc. All rights reserved.
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
const React = tslib_1.__importStar(require("react"));
const iconTypes_1 = require("../../iconTypes");
const svgIconContainer_1 = require("../../svgIconContainer");
exports.Bookmark = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "bookmark", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M120 400C109 400 100 391 100 380V310C100 299 100 281 100 270V220C100 209 100 191 100 180V20C100 9 106.4 6.4 114.2 14.2L186 86C193.8 93.8 206.6 93.8 214.2 86L286 14.2C293.6 6.4 300 9 300 20V180C300 191 300 209 300 220V270C300 281 300 299 300 310V380C300 391 291 400 280 400H120z" : "M224 319.8H221C220.6 319.8 220.4 320 220 320H100C99.6 320 99.4 319.8 99 319.8H96C87.2 319.8 80 312.4 80 303.4V8.4C80 -0.6 85 -2.8 91.4 3.6L148.8 62.4C155 68.8 165.2 68.8 171.4 62.4L228.8 3.6C235.0000000000001 -2.8 240.2000000000001 -0.6 240.2000000000001 8.4V303.4C240 312.4 232.8 319.8 224 319.8z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.Bookmark.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.Bookmark.displayName = `Blueprint6.Icon.Bookmark`;
exports.default = exports.Bookmark;
//# sourceMappingURL=bookmark.js.map