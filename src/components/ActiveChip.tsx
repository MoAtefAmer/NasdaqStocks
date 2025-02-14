import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const ActiveChip = () => {
  return (
    <View style={styles.chip}>
      <Text style={styles.text}>Active</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#00C853',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#00C853',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ActiveChip;
