"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clean = void 0;
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
exports.Clean = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "clean", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M140 400L100 300L0 260.0385184L100 220L140 120L180 220L280 259.8943316L180 300zM300 200L270 130.07389L200 100.102912L270 70.137224L300 0L330 70.137224L400 100L330 130.07389z" : "M240 160L216 104.07387L160 80.08233L216 56.137188L240 0L264 56.137188L320 80L264 104.07387zM100 320L70 250L0 220.102913L70 190L100 120L130 190L200 220L130 250z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.Clean.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.Clean.displayName = `Blueprint6.Icon.Clean`;
exports.default = exports.Clean;
//# sourceMappingURL=clean.js.map