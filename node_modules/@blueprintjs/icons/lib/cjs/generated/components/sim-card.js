"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimCard = void 0;
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
exports.SimCard = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "sim-card", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M334.2000000000001 294.2L234.2 394.2C230.6 397.8 225.6 400 220 400H80C69 400 60 391 60 380V20C60 9 69 0 80 0H320C331 0 340 9 340 20V280C340 285.6 337.8 290.6 334.2000000000001 294.2zM180 260H220V200H180V260zM120 260H160V200H120V260zM160 40H120V100H160V40zM220 40H180V100H220V40zM280 40H240V100H280V40zM280 120H120V180H280V120zM280 200H240V260H280V200z" : "M274.2000000000001 234.2L194.2 314.2C190.6 317.8 185.6 320 180 320H60C49 320 40 311 40 300V20C40 9 49 0 60 0H260C271 0 280 9 280 20V220C280 225.6 277.8 230.6 274.2000000000001 234.2zM140 200H180V160H140V200zM80 200H120V160H80V200zM120 40H80V80H120V40zM180 40H140V80H180V40zM240 40H200V80H240V40zM240 100H80V140H240V100zM240 160H200V200H240V160z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.SimCard.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.SimCard.displayName = `Blueprint6.Icon.SimCard`;
exports.default = exports.SimCard;
//# sourceMappingURL=sim-card.js.map