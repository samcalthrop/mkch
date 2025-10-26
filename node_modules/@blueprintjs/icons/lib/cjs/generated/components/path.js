"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Path = void 0;
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
exports.Path = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "path", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M360 400H40C18 400 0 382 0 360C0 338 18 320 40 320H180V240H80C58 240 40 222 40 200C40 178 58 160 80 160H180V80H120C98 80 80 62 80 40C80 18 98 0 120 0H280C302 0 320 18 320 40C320 62 302 80 280 80H220V160H320C342 160 360 178 360 200C360 222 342 240 320 240H220V320H360C382 320 400 338 400 360C400 382 382 400 360 400z" : "M290 320H30C13.4 320 0 306.6 0 290S13.4 260 30 260H140V200H70C53.4 200 40 186.6 40 170S53.4 140 70 140H140V80H110C93.4 80 80 66.6 80 50S93.4 20 110 20H210C226.6 20 240 33.4 240 50S226.6 80 210 80H180V140H250C266.6 140 280 153.4 280 170S266.6 200 250 200H180V260H290C306.6 260 320 273.4 320 290S306.6 320 290 320z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.Path.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.Path.displayName = `Blueprint6.Icon.Path`;
exports.default = exports.Path;
//# sourceMappingURL=path.js.map