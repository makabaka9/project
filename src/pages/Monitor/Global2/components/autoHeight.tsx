import React from 'react';

export type IReactComponent<P = any> =
  | React.StatelessComponent<P>
  | React.ComponentClass<P>
  | React.ClassicComponentClass<P>;

function computeHeight(node: HTMLDivElement) {
  const { style } = node;
  style.width = '98%';
  const totalHeight = parseInt(`${getComputedStyle(node).width}`, 10);
  const padding =
    parseInt(`${getComputedStyle(node).paddingTop}`, 10) +
    parseInt(`${getComputedStyle(node).paddingBottom}`, 10);
  return totalHeight - padding;
}

function getAutoHeight(n: HTMLDivElement) {
  if (!n) {
    return 0;
  }

  const node = n;

  let width = computeHeight(node);
  const parentNode = node.parentNode as HTMLDivElement;
  if (parentNode) {
    width = computeHeight(parentNode);
  }

  return width;
}

interface AutoHeightProps {
  width?: number;
}

function autoHeight() {
  return <P extends AutoHeightProps>(
    WrappedComponent: React.ComponentClass<P> | React.FC<P>,
  ): React.ComponentClass<P> => {
    class AutoHeightComponent extends React.Component<P & AutoHeightProps> {
      state = {
        computedHeight: 0,
      };

      root: HTMLDivElement | null = null;

      componentDidMount() {
        const { width } = this.props;
        if (!width && this.root) {
          let h = getAutoHeight(this.root);
          this.setState({ computedHeight: h });
          if (h < 1) {
            h = getAutoHeight(this.root);
            this.setState({ computedHeight: h });
          }
        }
      }

      handleRoot = (node: HTMLDivElement) => {
        this.root = node;
      };

      render() {
        const { width } = this.props;
        const { computedHeight } = this.state;
        const h = width || computedHeight;
        return (
          <div ref={this.handleRoot}>{h > 0 && <WrappedComponent {...this.props} width={h} />}</div>
        );
      }
    }
    return AutoHeightComponent;
  };
}
export default autoHeight;
