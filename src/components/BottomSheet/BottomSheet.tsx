import React, { useRef, memo, useEffect } from "react";
import { StyleSheet } from "react-native";
import RNBottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useBottomSheet } from "@/stores/bottomSheet";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
  },
  container: {
    width: "100%",
  },
});

const BottomSheet = memo(() => {
  const bottomSheetRef = useRef<RNBottomSheet>(null);
  const { isOpen, content, options, closeSheet } = useBottomSheet();

  useEffect(() => {
    if (isOpen) bottomSheetRef.current?.snapToIndex(0);
    else bottomSheetRef.current?.close();
  }, [isOpen]);

  const renderBackdropComponent = (backdropProps) => (
    <BottomSheetBackdrop {...backdropProps} disappearsOnIndex={-1} />
  );

  return (
    <RNBottomSheet
      ref={bottomSheetRef}
      animateOnMount
      enableDynamicSizing
      enablePanDownToClose
      backdropComponent={renderBackdropComponent}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      index={isOpen ? 0 : -1}
      onClose={closeSheet}
      {...options}
    >
      <BottomSheetScrollView
        contentContainerStyle={styles.container}
        style={styles.root}
      >
        {content}
      </BottomSheetScrollView>
    </RNBottomSheet>
  );
});

export default BottomSheet;
