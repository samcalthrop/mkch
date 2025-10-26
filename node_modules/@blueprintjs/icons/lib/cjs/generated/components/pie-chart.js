"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PieChart = void 0;
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
exports.PieChart = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "pie-chart", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M180 380.4C90 370.4 20 294.2000000000001 20 201.6C20 102.2 100.6 20.8 200 20.8C292.6 20.8 368.8 100 378.8 180H180V380.4zM200 401.6V200H400C400 320 310.4 401.6 200 401.6z" : "M140 298.4C72.6 288.4 20.6 230.4 20.6 160C20.6 82.6 83.2 20 160.2 20C230.6 20 288.6 72.2 298.4 140H140V298.4zM160 320V160H320C320 248.4 248.4 320 160 320z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.PieChart.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.PieChart.displayName = `Blueprint6.Icon.PieChart`;
exports.default = exports.PieChart;
//# sourceMappingURL=pie-chart.js.map