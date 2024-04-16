import React, {Component, ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../utils';

interface Props {
  children: ReactNode;
  backgroundColor?: string;
}

class Block extends Component<Props> {
  render() {
    const {children, backgroundColor} = this.props;
    return (
      <SafeAreaView
        edges={['right', 'left', 'top']}
        style={[
          styles.app,
          backgroundColor && {backgroundColor: backgroundColor},
        ]}>
        {children}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default Block;
