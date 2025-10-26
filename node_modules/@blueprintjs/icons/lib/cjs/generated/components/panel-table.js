"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelTable = void 0;
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
exports.PanelTable = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "panel-table", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M380 380H20C8 380 0 372 0 360V60C0 48 8 40 20 40H380C392 40 400 48 400 60V360C400 372 392 380 380 380zM200 160H140V220H200V160zM200 240H140V300H200V240zM40 80V340H120V80H40zM140 80V140H200V80H140zM360 80H220V140H360V80zM360 160H220V220H360V160zM360 240H220V300H360V240z" : "M300 300H20C8 300 0 292 0 280V60C0 48 8 40 20 40H300C312 40 320 48 320 60V280C320 292 312 300 300 300zM160 140H120V180H160V140zM160 200H120V240H160V200zM40 80V260H100V80H40zM120 80V120H160V80H120zM280 80H180V120H280V80zM280 140H180V180H280V140zM280 200H180V240H280V200z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.PanelTable.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.PanelTable.displayName = `Blueprint6.Icon.PanelTable`;
exports.default = exports.PanelTable;
//# sourceMappingURL=panel-table.js.map