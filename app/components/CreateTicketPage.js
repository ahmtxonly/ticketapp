import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SvgCss} from 'react-native-svg';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

import Assets from '@assets';
import {createTicketAction} from '@actions';

const backgroundOne = `
<svg viewBox="0 0 327 202" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M327 191.169V10.0615C327 4.50254 322.497 0 316.938 0H10.0615C4.50254 0 0 4.50254 0 10.0615V191.169C6.66577 191.169 12.0738 196.577 12.0738 203.243H314.926C314.926 196.577 320.334 191.169 327 191.169Z" fill="white"/>
</svg>`;

const backgroundTwo = `
<svg  viewBox="0 0 327 136" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M314.926 1H12.0738C12.0738 6.0618 6.66577 10.1685 0 10.1685V129.36C0 133.581 4.50254 137 10.0615 137H316.938C322.497 137 327 133.581 327 129.36V10.1685C320.334 10.1685 314.926 6.0618 314.926 1Z" fill="white"/>
    <path d="M12.0739 1L314.926 1" stroke="#C7C7C7" stroke-width="2" stroke-dasharray="8 4"/>
</svg>`;

const CreateTicketPage = () => {
  const dispatch = useDispatch();
  const CELL_COUNT = 8;

  const {tickets, createTicket, selectedTickets, user_balance} =
    useSelector(state => state.ticket) || {};

  const [value, setValue] = useState('');
  const [showError, setShowError] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const valuePlaceHolder = () => {
    let pValue = '';
    for (let index = 0; index < CELL_COUNT - value.length; index++) {
      pValue += '_';
    }
    return `${value}${pValue}`;
  };

  const getRandom = length => {
    return Math.floor(
      Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1),
    );
  };

  const submitHandler = () => {
    if (value.length && tickets.includes(value)) {
      setShowError(true);
    } else {
      dispatch(createTicketAction(value));
    }
  };

  const randomHandler = () => {
    const randomCode = getRandom(CELL_COUNT);
    setValue(`${randomCode}`);
    if (tickets.includes(randomCode)) {
      setShowError(true);
    } else {
      setShowError(false);
      dispatch(createTicketAction(randomCode));
    }
  };

  useEffect(() => {
    if (!createTicket) {
      setValue('');
    }
  }, [createTicket]);

  return (
    <>
      <View style={styles.createTicketsContainer}>
        <Text style={styles.title}>Choose your number</Text>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFiledRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          returnKeyType="done"
          blurOnSubmit={true}
          editable={!(selectedTickets?.length === user_balance)}
          onSubmitEditing={() => submitHandler()}
          onBlur={() => submitHandler()}
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
      <View style={styles.secondSide}>
        <View style={styles.content}>
          <View style={styles.contentInner}>
            <View style={styles.codeSideWrapper}>
              <Text style={styles.contentTitle}>Your Ticket Numbers</Text>
              <View style={styles.codeSide}>
                <Text style={styles.codeText}>{valuePlaceHolder()}</Text>
              </View>
            </View>
            <View style={styles.refreshSide}>
              {showError && (
                <Text style={styles.errorText}>
                  Ticket number has been already bought
                </Text>
              )}
              <View>
                {selectedTickets?.length === user_balance && (
                  <Text style={styles.errorText}>
                    Your balance is not available for more
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={[
                  styles.refreshButton,
                  selectedTickets?.length === user_balance &&
                    styles.refreshButtonDisabled,
                ]}
                disabled={selectedTickets?.length === user_balance}
                onPress={() => randomHandler()}>
                <Image
                  style={{width: 16, height: 16}}
                  source={Assets.purpleRefreshIcon}
                />
                <Text style={styles.refreshText}>Refresh</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.svgBackground}>
            <SvgCss xml={backgroundOne} width="100%" height="202" />
            <SvgCss xml={backgroundTwo} width="100%" height="136" />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  createTicketsContainer: {
    // flex: 1,
    padding: 24,
    paddingTop: 8,
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Rubik',
  },
  codeFiledRoot: {marginTop: 20},
  cell: {
    width: 34,
    height: 40,
    lineHeight: 38,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    textAlign: 'center',
    borderRadius: 6,
    color: '#7248DD',
    fontWeight: '600',
    fontFamily: 'Rubik',
  },
  focusCell: {
    borderColor: '#7248DD',
  },
  secondSide: {
    // paddingHorizontal: 24,
    // backgroundColor: 'red',
    width: '100%',
    paddingHorizontal: 24,
  },
  content: {
    // marginTop: 32,
    shadowColor: '#7A81BE',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.16,
    shadowRadius: 6.27,
    elevation: 10,
    // backgroundColor: 'red',
    position: 'relative',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  svgBackground: {
    position: 'absolute',
    width: '100%',
    zIndex: 0,
  },
  contentInner: {
    position: 'relative',
    zIndex: 1,
    alignItems: 'center',
    width: '100%',
  },
  codeSideWrapper: {
    height: 204,
    width: '100%',
    alignItems: 'center',
  },
  codeSide: {
    backgroundColor: '#EE1D79',
    height: 86,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Rubik',
  },
  contentTitle: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 24,
    fontFamily: 'Rubik',
  },
  refreshSide: {
    height: 136,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  refreshButton: {
    width: 128,
    height: 40,
    borderWidth: 1,
    borderColor: '#7248DD',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  refreshButtonDisabled: {
    opacity: 0.5,
  },
  refreshText: {
    color: '#7248DD',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    fontFamily: 'Rubik',
  },
  errorText: {
    fontSize: 14,
  },
});

export default CreateTicketPage;
