"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChevronBackward = void 0;
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
exports.ChevronBackward = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "chevron-backward", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M168.2 200L274 305.8C277.8 309.4 280 314.4 280 320C280 331 271 340 260 340C254.4 340 249.4 337.8 245.8 334.2L140 228.2V320C140 331 131 340 120 340S100 331 100 320V80C100 69 109 60 120 60S140 69 140 80V171.8L245.8 66C249.4 62.2 254.4 60 260 60C271 60 280 69 280 80C280 85.6 277.8 90.6 274.2000000000001 94.2000000000001L168.2 200z" : "M148.2 160L214 225.8C217.8 229.4 220 234.4 220 240C220 251 211 260 200 260C194.4 260 189.4 257.8 185.8 254.2L120 188.2V240C120 251 111 260 100 260S80 251 80 240V80C80 69 89 60 100 60S120 69 120 80V131.8L185.8 66C189.4 62.2 194.4 60 200 60C211 60 220 69 220 80C220 85.6 217.8 90.6 214.2 94.2L148.2 160z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.ChevronBackward.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.ChevronBackward.displayName = `Blueprint6.Icon.ChevronBackward`;
exports.default = exports.ChevronBackward;
//# sourceMappingURL=chevron-backward.js.map