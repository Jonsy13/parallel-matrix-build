import { getNode } from '../../../utils/createSVGNode';
import { getIcon } from './icons';

interface CreateLabelProps {
  currentNodeID: string;
  selectedNodeID: string;
  label: string;
  tooltip?: string;
  phase: string;
  horizontal: boolean;
}

interface CreateLabel {
  (props: CreateLabelProps): SVGElement;
}

// Firefox 1.0+
// @ts-ignore
const isFirefox = typeof InstallTrigger !== 'undefined';

const createLabel: CreateLabel = ({
  currentNodeID,
  selectedNodeID,
  label,
  tooltip,
  phase,
  horizontal,
}) => {
  const g = getNode('g');

  const circle = getNode('circle', {
    cx: 0,
    cy: 0,
    r: 15,
  });

  g.appendChild(circle);

  // If Current Node is selected, then selection circle gets appended
  if (currentNodeID === selectedNodeID) {
    const outerCircle = getNode('circle', {
      cx: 0,
      cy: 0,
      r: 18,
      class: 'selected',
    });
    g.appendChild(outerCircle);
  }

  if (tooltip) {
    const title = getNode('title');
    title.innerHTML = tooltip;
    circle.appendChild(title);
  }

  g.appendChild(getIcon(phase));

  const text = getNode('text');
  g.appendChild(text);

  const increment = horizontal ? 10 : 25;
  for (let i = 0; i < label.length; i += increment) {
    const tspan = getNode('tspan', {
      x: horizontal || label.length > 25 ? -2 * increment : -label.length * 3,
      y: (isFirefox ? 35 : 20) + i * (horizontal ? 1.2 : 0.6),
      dy: '1rem',
    });
    tspan.innerHTML =
      i + increment < label.length - 1
        ? label.slice(i, i + increment)
        : label.slice(i);
    text.appendChild(tspan);
  }

  return g;
};
export { createLabel };
