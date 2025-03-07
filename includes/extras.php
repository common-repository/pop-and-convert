<?php
/**
 * Helper Functions
 *
 * @package Pop_And_Convert
 */

/**
 * Check if Pro plugin is activated
 *
 * @return boolean
 */
function pop_and_convert_pro_is_activated() {
	return function_exists( 'pop_and_convert_pro_load' );
}

/**
 * Return SVG html markup
 *
 * @param string $svg - Name of the SVG required
 *
 * @return string
 */
function pop_and_convert_get_svg( $svg ) {

	switch ( $svg ) {
		case 'affiliate_icon';
			return '<svg width="70" height="42" viewBox="0 0 213 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.4398 13.9538C10.9611 13.9538 10.4825 14.0495 10.0038 14.241C9.55708 14.4324 9.14225 14.7196 8.75933 15.1026C8.40832 15.4855 8.10517 15.9482 7.84989 16.4906C7.62652 17.0331 7.51483 17.6554 7.51483 18.3574V21.6601C7.51483 23.8938 7.83393 25.5372 8.47214 26.5902C9.14225 27.6113 9.98787 28.1219 11.009 28.1219C12.062 28.1219 12.9555 27.5634 13.6894 26.4466C14.4553 25.2978 14.8701 23.4949 14.9339 21.0378C15.0297 18.5488 14.7425 16.7459 14.0724 15.6291C13.4022 14.5122 12.5247 13.9538 11.4398 13.9538ZM12.8279 33.0041C11.3919 33.0041 10.2591 32.7488 9.42944 32.2383C8.59978 31.7596 7.96157 30.9778 7.51483 29.8929V41.3805H1.43596V9.78952H2.15393C2.50494 9.78952 2.80809 9.94907 3.06337 10.2682C3.31865 10.5873 3.6218 10.9383 3.97281 11.3212C4.32382 11.7041 4.75461 12.0711 5.26517 12.4221C5.80764 12.7412 6.52562 12.9008 7.4191 12.9008C7.89775 11.5286 8.59978 10.5394 9.52517 9.93311C10.4506 9.32682 11.5515 9.02367 12.8279 9.02367C14.2319 9.02367 15.4764 9.263 16.5613 9.74165C17.6782 10.1884 18.6036 10.9064 19.3375 11.8956C20.1034 12.8848 20.6778 14.1452 21.0607 15.6769C21.4436 17.1767 21.6031 18.9637 21.5393 21.0378C21.4755 23.112 21.2043 24.9149 20.7256 26.4466C20.2789 27.9464 19.6726 29.1909 18.9067 30.1801C18.1409 31.1374 17.2474 31.8394 16.2263 32.2861C15.2052 32.7648 14.0724 33.0041 12.8279 33.0041ZM38.6096 20.99C38.6096 19.7774 38.482 18.7243 38.2267 17.8309C38.0033 16.9374 37.7002 16.2034 37.3173 15.6291C36.9343 15.0547 36.4876 14.6239 35.977 14.3367C35.4984 14.0495 34.9878 13.9059 34.4453 13.9059C33.9348 13.9059 33.4242 14.0495 32.9137 14.3367C32.435 14.6239 32.0042 15.0547 31.6213 15.6291C31.2384 16.2034 30.9193 16.9374 30.664 17.8309C30.4406 18.7243 30.3289 19.7774 30.3289 20.99C30.3289 23.447 30.7438 25.25 31.5734 26.3987C32.435 27.5156 33.3923 28.074 34.4453 28.074C35.5303 28.074 36.4876 27.5156 37.3173 26.3987C38.1788 25.25 38.6096 23.447 38.6096 20.99ZM23.7714 20.99C23.7714 18.9158 24.0586 17.1288 24.633 15.6291C25.2393 14.1293 26.037 12.8848 27.0262 11.8956C28.0155 10.9064 29.1483 10.1884 30.4247 9.74165C31.733 9.263 33.0732 9.02367 34.4453 9.02367C35.8494 9.02367 37.1896 9.263 38.466 9.74165C39.7424 10.1884 40.8752 10.9064 41.8644 11.8956C42.8856 12.8848 43.6833 14.1293 44.2577 15.6291C44.864 17.1288 45.1671 18.9158 45.1671 20.99C45.1671 23.0641 44.864 24.867 44.2577 26.3987C43.6833 27.8985 42.8856 29.143 41.8644 30.1322C40.8752 31.0895 39.7424 31.8075 38.466 32.2861C37.1896 32.7648 35.8494 33.0041 34.4453 33.0041C33.0732 33.0041 31.733 32.7648 30.4247 32.2861C29.1483 31.8075 28.0155 31.0895 27.0262 30.1322C26.037 29.143 25.2393 27.8985 24.633 26.3987C24.0586 24.867 23.7714 23.0641 23.7714 20.99ZM57.9026 13.9538C57.424 13.9538 56.9453 14.0495 56.4667 14.241C56.0199 14.4324 55.6051 14.7196 55.2222 15.1026C54.8712 15.4855 54.568 15.9482 54.3128 16.4906C54.0894 17.0331 53.9777 17.6554 53.9777 18.3574V21.6601C53.9777 23.8938 54.2968 25.5372 54.935 26.5902C55.6051 27.6113 56.4507 28.1219 57.4719 28.1219C58.5249 28.1219 59.4184 27.5634 60.1523 26.4466C60.9181 25.2978 61.333 23.4949 61.3968 21.0378C61.4925 18.5488 61.2053 16.7459 60.5352 15.6291C59.8651 14.5122 58.9876 13.9538 57.9026 13.9538ZM59.2907 33.0041C57.8548 33.0041 56.722 32.7488 55.8923 32.2383C55.0626 31.7596 54.4244 30.9778 53.9777 29.8929V41.3805H47.8988V9.78952H48.6168C48.9678 9.78952 49.271 9.94907 49.5262 10.2682C49.7815 10.5873 50.0847 10.9383 50.4357 11.3212C50.7867 11.7041 51.2175 12.0711 51.728 12.4221C52.2705 12.7412 52.9885 12.9008 53.882 12.9008C54.3606 11.5286 55.0626 10.5394 55.988 9.93311C56.9134 9.32682 58.0143 9.02367 59.2907 9.02367C60.6948 9.02367 61.9393 9.263 63.0242 9.74165C64.1411 10.1884 65.0665 10.9064 65.8004 11.8956C66.5662 12.8848 67.1406 14.1452 67.5235 15.6769C67.9065 17.1767 68.066 18.9637 68.0022 21.0378C67.9384 23.112 67.6671 24.9149 67.1885 26.4466C66.7417 27.9464 66.1355 29.1909 65.3696 30.1801C64.6038 31.1374 63.7103 31.8394 62.6892 32.2861C61.668 32.7648 60.5352 33.0041 59.2907 33.0041Z" fill="#121212"/>
                <path d="M98.8407 26.5421C98.5855 29.063 97.6441 30.9297 96.0167 32.1423C94.4212 33.3549 92.4268 33.9612 90.0336 33.9612C88.1509 33.9612 86.5394 33.674 85.1992 33.0996C83.8909 32.4933 82.8219 31.6636 81.9922 30.6106C81.1625 29.5576 80.5562 28.2971 80.1733 26.8292C79.7904 25.3295 79.5989 23.7021 79.5989 21.947C79.5989 19.8409 79.8861 18.038 80.4605 16.5382C81.0349 15.0065 81.8007 13.7621 82.758 12.8047C83.7473 11.8155 84.8641 11.0976 86.1086 10.6508C87.385 10.1722 88.6933 9.93284 90.0336 9.93284C91.4695 9.93284 92.73 10.1243 93.8149 10.5072C94.8998 10.8901 95.8093 11.4326 96.5432 12.1346C97.3091 12.8367 97.8834 13.6504 98.2664 14.5758C98.6493 15.5012 98.8407 16.5223 98.8407 17.6391V21.1333H92.9055V17.9742C92.9055 17.0488 92.6183 16.3308 92.0439 15.8203C91.5014 15.3097 90.7196 15.0544 89.6985 15.0544C88.5178 15.0544 87.5924 15.6607 86.9223 16.8733C86.2522 18.0859 85.9171 19.7771 85.9171 21.947C85.9171 24.2445 86.2682 26.0155 86.9702 27.26C87.6722 28.4726 88.6933 29.063 90.0336 29.031C90.6718 29.031 91.278 28.8715 91.8524 28.5524C92.4587 28.2014 92.8097 27.5313 92.9055 26.5421H98.8407ZM115.892 21.947C115.892 20.7344 115.765 19.6814 115.509 18.7879C115.286 17.8944 114.983 17.1605 114.6 16.5861C114.217 16.0117 113.77 15.5809 113.26 15.2937C112.781 15.0065 112.271 14.863 111.728 14.863C111.218 14.863 110.707 15.0065 110.196 15.2937C109.718 15.5809 109.287 16.0117 108.904 16.5861C108.521 17.1605 108.202 17.8944 107.947 18.7879C107.723 19.6814 107.612 20.7344 107.612 21.947C107.612 24.4041 108.026 26.207 108.856 27.3558C109.718 28.4726 110.675 29.031 111.728 29.031C112.813 29.031 113.77 28.4726 114.6 27.3558C115.462 26.207 115.892 24.4041 115.892 21.947ZM101.054 21.947C101.054 19.8728 101.341 18.0859 101.916 16.5861C102.522 15.0863 103.32 13.8418 104.309 12.8526C105.298 11.8634 106.431 11.1454 107.707 10.6987C109.016 10.22 110.356 9.9807 111.728 9.9807C113.132 9.9807 114.472 10.22 115.749 10.6987C117.025 11.1454 118.158 11.8634 119.147 12.8526C120.168 13.8418 120.966 15.0863 121.54 16.5861C122.147 18.0859 122.45 19.8728 122.45 21.947C122.45 24.0212 122.147 25.8241 121.54 27.3558C120.966 28.8555 120.168 30.1 119.147 31.0892C118.158 32.0465 117.025 32.7645 115.749 33.2432C114.472 33.7218 113.132 33.9612 111.728 33.9612C110.356 33.9612 109.016 33.7218 107.707 33.2432C106.431 32.7645 105.298 32.0465 104.309 31.0892C103.32 30.1 102.522 28.8555 101.916 27.3558C101.341 25.8241 101.054 24.0212 101.054 21.947ZM134.563 14.6715C133.446 14.6715 132.633 14.9746 132.122 15.5809C131.611 16.1553 131.324 16.8414 131.26 17.6391V33.1953H125.182V10.7465H125.9C126.251 10.7465 126.554 10.9061 126.809 11.2252C127.064 11.5443 127.351 11.8953 127.671 12.2782C128.022 12.6612 128.452 13.0122 128.963 13.3313C129.505 13.6504 130.207 13.8259 131.069 13.8578L136.43 9.9807C137.451 9.9807 138.408 10.1403 139.302 10.4594C140.227 10.7785 141.025 11.2412 141.695 11.8474C142.397 12.4537 142.94 13.2036 143.322 14.0971C143.737 14.9587 143.945 15.9319 143.945 17.0169V33.1953H137.914V18.2135C137.914 17.7668 137.85 17.336 137.722 16.9212C137.595 16.5063 137.403 16.1394 137.148 15.8203C136.893 15.4692 136.542 15.198 136.095 15.0065C135.68 14.7832 135.169 14.6715 134.563 14.6715ZM154.913 28.9832L157.833 10.7465H163.912L159.795 33.1953H149.743L145.627 10.7465H151.706L154.913 28.9832ZM171.036 22.2342C171.482 21.8832 172.025 21.5481 172.663 21.229C173.301 20.9099 174.051 20.6227 174.913 20.3674C176.955 19.7612 177.976 18.7719 177.976 17.3998C177.976 16.7935 177.785 16.2191 177.402 15.6767C177.019 15.1023 176.412 14.8151 175.583 14.8151C174.626 14.8151 173.844 15.0704 173.237 15.5809C172.631 16.0596 172.168 16.6659 171.849 17.3998C171.53 18.1337 171.307 18.9315 171.179 19.7931C171.084 20.6546 171.036 21.4683 171.036 22.2342ZM175.535 24.6274C174.61 24.7232 173.828 24.9306 173.19 25.2497C172.551 25.5369 172.057 25.856 171.706 26.207C172.089 27.1962 172.583 27.9301 173.19 28.4088C173.828 28.8555 174.482 29.0789 175.152 29.0789C175.822 29.0789 176.428 28.9034 176.971 28.5524C177.545 28.2014 177.912 27.5313 178.072 26.5421H184.007C183.879 27.8823 183.544 29.031 183.002 29.9883C182.491 30.9137 181.837 31.6796 181.039 32.2859C180.242 32.8603 179.332 33.2751 178.311 33.5304C177.322 33.8176 176.269 33.9612 175.152 33.9612C173.62 33.9612 172.216 33.7059 170.94 33.1953C169.663 32.6848 168.563 31.9349 167.637 30.9456C166.744 29.9245 166.042 28.6641 165.531 27.1643C165.021 25.6645 164.765 23.9414 164.765 21.9949C164.765 20.0803 165.037 18.389 165.579 16.9212C166.153 15.4214 166.919 14.1609 167.877 13.1398C168.834 12.1187 169.935 11.3369 171.179 10.7944C172.456 10.2519 173.78 9.9807 175.152 9.9807C178.056 9.9807 180.258 10.6668 181.757 12.0389C183.257 13.411 184.007 15.198 184.007 17.3998C184.007 19.6973 183.289 21.4045 181.853 22.5214C180.449 23.6063 178.343 24.3083 175.535 24.6274ZM194.884 15.4373C194.182 15.4373 193.64 15.5969 193.257 15.916C192.906 16.2351 192.698 16.7776 192.634 17.5434V33.1953H186.556V10.7465H187.274C187.625 10.7465 187.912 10.9061 188.135 11.2252C188.39 11.5124 188.694 11.8474 189.045 12.2304C189.396 12.6133 189.826 12.9803 190.337 13.3313C190.847 13.6504 191.534 13.8259 192.395 13.8578L196.942 10.7465H199.336V16.2032L194.884 15.4373ZM202.095 25.3933V16.1074H200.276V10.7465H202.095V4.09329H202.812C203.164 4.09329 203.467 4.25284 203.722 4.57194C203.977 4.89104 204.28 5.24205 204.631 5.62497C205.014 6.0079 205.477 6.35891 206.019 6.67801C206.562 6.99711 207.28 7.15666 208.173 7.15666V10.7465H212.003V16.1074H208.173V24.2445C208.173 24.9465 208.285 25.505 208.508 25.9198C208.732 26.3027 209.019 26.5899 209.37 26.7814C209.721 26.9409 210.12 27.0367 210.567 27.0686C211.045 27.1005 211.524 27.1164 212.003 27.1164V33.1953H208.173C207.088 33.1953 206.147 32.9879 205.349 32.5731C204.584 32.1263 203.961 31.536 203.483 30.8021C203.004 30.0681 202.653 29.2385 202.43 28.3131C202.206 27.3558 202.095 26.3825 202.095 25.3933Z" fill="#F9D35E"/>
                <path d="M97.8837 25.5845C97.6284 28.1054 96.6871 29.9722 95.0597 31.1848C93.4642 32.3973 91.4698 33.0036 89.0765 33.0036C87.1938 33.0036 85.5824 32.7164 84.2421 32.1421C82.9338 31.5358 81.8648 30.7061 81.0352 29.6531C80.2055 28.6 79.5992 27.3396 79.2163 25.8717C78.8334 24.3719 78.6419 22.7445 78.6419 20.9895C78.6419 18.8834 78.9291 17.0805 79.5035 15.5807C80.0779 14.049 80.8437 12.8045 81.801 11.8472C82.7902 10.858 83.9071 10.14 85.1516 9.6933C86.428 9.21465 87.7363 8.97532 89.0765 8.97532C90.5125 8.97532 91.7729 9.16678 92.8579 9.5497C93.9428 9.93262 94.8523 10.4751 95.5862 11.1771C96.352 11.8791 96.9264 12.6928 97.3093 13.6182C97.6923 14.5436 97.8837 15.5648 97.8837 16.6816V20.1758H91.9484V17.0167C91.9484 16.0913 91.6612 15.3733 91.0869 14.8627C90.5444 14.3522 89.7626 14.0969 88.7415 14.0969C87.5608 14.0969 86.6354 14.7032 85.9653 15.9158C85.2952 17.1284 84.9601 18.8196 84.9601 20.9895C84.9601 23.287 85.3111 25.058 86.0132 26.3025C86.7152 27.5151 87.7363 28.1054 89.0765 28.0735C89.7147 28.0735 90.321 27.914 90.8954 27.5949C91.5017 27.2439 91.8527 26.5737 91.9484 25.5845H97.8837ZM114.935 20.9895C114.935 19.7769 114.808 18.7239 114.552 17.8304C114.329 16.9369 114.026 16.203 113.643 15.6286C113.26 15.0542 112.813 14.6234 112.303 14.3362C111.824 14.049 111.314 13.9054 110.771 13.9054C110.26 13.9054 109.75 14.049 109.239 14.3362C108.761 14.6234 108.33 15.0542 107.947 15.6286C107.564 16.203 107.245 16.9369 106.99 17.8304C106.766 18.7239 106.655 19.7769 106.655 20.9895C106.655 23.4466 107.069 25.2495 107.899 26.3982C108.761 27.5151 109.718 28.0735 110.771 28.0735C111.856 28.0735 112.813 27.5151 113.643 26.3982C114.505 25.2495 114.935 23.4466 114.935 20.9895ZM100.097 20.9895C100.097 18.9153 100.384 17.1284 100.959 15.6286C101.565 14.1288 102.363 12.8843 103.352 11.8951C104.341 10.9059 105.474 10.1879 106.75 9.74116C108.059 9.26251 109.399 9.02319 110.771 9.02319C112.175 9.02319 113.515 9.26251 114.792 9.74116C116.068 10.1879 117.201 10.9059 118.19 11.8951C119.211 12.8843 120.009 14.1288 120.583 15.6286C121.19 17.1284 121.493 18.9153 121.493 20.9895C121.493 23.0636 121.19 24.8666 120.583 26.3982C120.009 27.898 119.211 29.1425 118.19 30.1317C117.201 31.089 116.068 31.807 114.792 32.2857C113.515 32.7643 112.175 33.0036 110.771 33.0036C109.399 33.0036 108.059 32.7643 106.75 32.2857C105.474 31.807 104.341 31.089 103.352 30.1317C102.363 29.1425 101.565 27.898 100.959 26.3982C100.384 24.8666 100.097 23.0636 100.097 20.9895ZM133.606 13.714C132.489 13.714 131.676 14.0171 131.165 14.6234C130.654 15.1978 130.367 15.8839 130.303 16.6816V32.2378H124.225V9.78903H124.942C125.294 9.78903 125.597 9.94858 125.852 10.2677C126.107 10.5868 126.394 10.9378 126.714 11.3207C127.065 11.7036 127.495 12.0546 128.006 12.3737C128.548 12.6928 129.25 12.8684 130.112 12.9003L135.473 9.02319C136.494 9.02319 137.451 9.18274 138.345 9.50184C139.27 9.82094 140.068 10.2836 140.738 10.8899C141.44 11.4962 141.982 12.2461 142.365 13.1396C142.78 14.0012 142.988 14.9744 142.988 16.0594V32.2378H136.957V17.256C136.957 16.8093 136.893 16.3785 136.765 15.9636C136.638 15.5488 136.446 15.1818 136.191 14.8627C135.936 14.5117 135.585 14.2405 135.138 14.049C134.723 13.8257 134.212 13.714 133.606 13.714ZM153.956 28.0257L156.876 9.78903H162.955L158.838 32.2378H148.786L144.67 9.78903H150.749L153.956 28.0257ZM170.079 21.2767C170.525 20.9257 171.068 20.5906 171.706 20.2715C172.344 19.9524 173.094 19.6652 173.956 19.4099C175.998 18.8036 177.019 17.8144 177.019 16.4423C177.019 15.836 176.828 15.2616 176.445 14.7191C176.062 14.1448 175.455 13.8576 174.626 13.8576C173.668 13.8576 172.887 14.1128 172.28 14.6234C171.674 15.1021 171.211 15.7084 170.892 16.4423C170.573 17.1762 170.35 17.974 170.222 18.8355C170.126 19.6971 170.079 20.5108 170.079 21.2767ZM174.578 23.6699C173.653 23.7657 172.871 23.9731 172.233 24.2922C171.594 24.5794 171.1 24.8985 170.749 25.2495C171.132 26.2387 171.626 26.9726 172.233 27.4513C172.871 27.898 173.525 28.1214 174.195 28.1214C174.865 28.1214 175.471 27.9459 176.014 27.5949C176.588 27.2439 176.955 26.5737 177.115 25.5845H183.05C182.922 26.9248 182.587 28.0735 182.045 29.0308C181.534 29.9562 180.88 30.7221 180.082 31.3284C179.285 31.9027 178.375 32.3176 177.354 32.5728C176.365 32.86 175.312 33.0036 174.195 33.0036C172.663 33.0036 171.259 32.7484 169.983 32.2378C168.706 31.7272 167.606 30.9773 166.68 29.9881C165.787 28.967 165.085 27.7066 164.574 26.2068C164.064 24.707 163.808 22.9839 163.808 21.0373C163.808 19.1227 164.08 17.4315 164.622 15.9636C165.196 14.4639 165.962 13.2034 166.92 12.1823C167.877 11.1612 168.978 10.3794 170.222 9.83689C171.499 9.29442 172.823 9.02319 174.195 9.02319C177.099 9.02319 179.301 9.70925 180.8 11.0814C182.3 12.4535 183.05 14.2405 183.05 16.4423C183.05 18.7398 182.332 20.447 180.896 21.5639C179.492 22.6488 177.386 23.3508 174.578 23.6699ZM193.927 14.4798C193.225 14.4798 192.683 14.6394 192.3 14.9585C191.949 15.2776 191.741 15.82 191.677 16.5859V32.2378H185.599V9.78903H186.316C186.667 9.78903 186.955 9.94858 187.178 10.2677C187.433 10.5549 187.736 10.8899 188.087 11.2728C188.439 11.6558 188.869 12.0227 189.38 12.3737C189.89 12.6928 190.576 12.8684 191.438 12.9003L195.985 9.78903H198.379V15.2457L193.927 14.4798ZM201.137 24.4358V15.1499H199.319V9.78903H201.137V3.13577H201.855C202.206 3.13577 202.51 3.29532 202.765 3.61442C203.02 3.93352 203.323 4.28453 203.674 4.66745C204.057 5.05038 204.52 5.40139 205.062 5.72049C205.605 6.03959 206.323 6.19914 207.216 6.19914V9.78903H211.046V15.1499H207.216V23.287C207.216 23.989 207.328 24.5475 207.551 24.9623C207.775 25.3452 208.062 25.6324 208.413 25.8239C208.764 25.9834 209.163 26.0791 209.61 26.1111C210.088 26.143 210.567 26.1589 211.046 26.1589V32.2378H207.216C206.131 32.2378 205.19 32.0304 204.392 31.6155C203.626 31.1688 203.004 30.5785 202.526 29.8445C202.047 29.1106 201.696 28.2809 201.473 27.3555C201.249 26.3982 201.137 25.425 201.137 24.4358Z" fill="#253B80"/>
                <path d="M73.9269 25.5864L71.6265 26.0516L73.9269 26.5858V25.5864ZM74.8919 26.8098L75.9258 27.0424V28.1366L70.5582 26.8701V25.0694L75.9258 24.0872V25.1814L74.8919 25.3882V26.8098ZM72.0487 22.6443H75.9258V23.7385H70.5582V22.0499L73.9872 20.8006H70.5668L70.5582 19.715H75.9258V21.2141L72.0487 22.6443ZM71.5231 18.0168H74.9608V17.1293C74.9608 16.98 74.8144 16.8508 74.5214 16.7416C74.2227 16.6325 73.7632 16.5779 73.1429 16.5779C72.8385 16.5779 72.5829 16.5894 72.3761 16.6124C72.1693 16.6354 72.0028 16.6698 71.8764 16.7158C71.75 16.7617 71.661 16.8192 71.6093 16.8881C71.5519 16.957 71.5231 17.0374 71.5231 17.1293V18.0168ZM73.0137 15.5354C73.5995 15.5354 74.082 15.5756 74.4611 15.656C74.8402 15.7307 75.1389 15.837 75.3571 15.9748C75.5697 16.1127 75.719 16.2735 75.8052 16.4573C75.8856 16.6354 75.9258 16.8278 75.9258 17.0346V19.111H70.5582V17.0346C70.5582 16.8278 70.5984 16.6325 70.6788 16.4487C70.7535 16.2649 70.8856 16.1069 71.0751 15.9748C71.2647 15.837 71.5174 15.7307 71.8333 15.656C72.1435 15.5756 72.5369 15.5354 73.0137 15.5354Z" fill="black"/>
                <path d="M4.78611 0.896484C5.44879 0.896484 6.09658 1.09299 6.64758 1.46116C7.19858 1.82932 7.62803 2.35261 7.88162 2.96484C8.13522 3.57708 8.20157 4.25076 8.07229 4.90071C7.94301 5.55065 7.6239 6.14767 7.15531 6.61625C6.68673 7.08484 6.08972 7.40395 5.43977 7.53323C4.78983 7.66251 4.11614 7.59616 3.5039 7.34256C2.89167 7.08897 2.36838 6.65952 2.00022 6.10852C1.63205 5.55752 1.43555 4.90972 1.43555 4.24705C1.43555 3.35842 1.78855 2.50619 2.4169 1.87784C3.04526 1.24949 3.89748 0.896484 4.78611 0.896484Z" fill="#F9D35E"/>
            </svg>';

		case 'cross':
			return '<svg class="pac-close-icon" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1L1 7M1 1L7 7" stroke="#FF3D3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>';

		case 'down-arrow':
			return '<svg class="pac-down-icon" width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.5 9.99998C8.29673 10.0009 8.09533 9.96154 7.90759 9.88409C7.71985 9.80664 7.54957 9.69271 7.40674 9.54898L0.248968 2.37394C0.0604506 2.08498 -0.0249909 1.74148 0.00633722 1.39851C0.0376654 1.05553 0.18395 0.732944 0.421743 0.482441C0.659536 0.231938 0.975068 0.0680284 1.31777 0.0169845C1.66047 -0.0340594 2.01049 0.0307185 2.31173 0.200934L8.5 6.35097L14.6883 0.200934C14.9895 0.0307185 15.3395 -0.0340594 15.6822 0.0169845C16.0249 0.0680284 16.3405 0.231938 16.5783 0.482441C16.816 0.732944 16.9623 1.05553 16.9937 1.39851C17.025 1.74148 16.9395 2.08498 16.751 2.37394L9.53138 9.54898C9.25804 9.82454 8.88909 9.98587 8.5 9.99998Z" fill="#3FCD67"/>
            </svg>';

		default:
			return '';
	}
}

/**
 * Return markup for the selected layout
 *
 * @param string $notificationType
 * @param string $notificationLayout
 * @param string $class
 * @param string $desc
 * @param array $imageData
 * @param string $imageSize
 * @param string $leadTitle
 * @param string $buttonTitle
 * @param url $buttonLink
 * @param string $target
 * @param string $rel_safe
 * @param boolean $displayCredits
 * @param url $affiliateLink
 *
 * @return html
 */
function pop_and_convert_get_layout(
	$notificationType,
	$notificationLayout,
	$class,
	$desc,
	$imageData,
	$imageSize,
	$leadTitle,
	$buttonTitle,
	$buttonLink,
	$target,
	$rel_safe,
	$displayCredits,
	$affiliateLink
) {

	if ( $notificationType === 'sticky' ) {
		pop_and_convert_get_sticky(
			$desc,
			$imageData,
			$imageSize,
			$leadTitle,
			$buttonTitle,
			$buttonLink,
			$target,
			$rel_safe,
			$displayCredits,
			$affiliateLink
		);
	} else {
		pop_and_convert_get_popup(
			$notificationLayout,
			$class,
			$desc,
			$imageData,
			$imageSize,
			$leadTitle,
			$buttonTitle,
			$buttonLink,
			$target,
			$rel_safe,
			$displayCredits,
			$affiliateLink
		);
	}
}

/**
 * Retrieve markup for Notification sticky layout
 *
 * @param string $desc
 * @param array $imageData
 * @param string $imageSize
 * @param string $leadTitle
 * @param string $buttonTitle
 * @param url $buttonLink
 * @param string $target
 * @param string $rel_safe
 * @param boolean $displayCredits
 * @param url $affiliateLink
 *
 * @return html
 */
function pop_and_convert_get_sticky(
	$desc,
	$imageData,
	$imageSize,
	$leadTitle,
	$buttonTitle,
	$buttonLink,
	$target,
	$rel_safe,
	$displayCredits,
	$affiliateLink
) {
	?>
	<div class="pac-sticky-wrapper">
		<div class="pac-content-wrapper">
			<div class="pac-sticky-close-wrapper">
				<div class="pac-sticky-close">
					<?php if ( $desc ) { ?>
						<button class="pac-close-button down">
							<?php echo wp_kses( pop_and_convert_get_svg( 'down-arrow' ), 'allow_svg_html' ); ?>
						</button>
					<?php } ?>
					<button class="pac-close-button cross">
						<?php echo wp_kses( pop_and_convert_get_svg( 'cross' ), 'allow_svg_html' ); ?>
					</button>
				</div>
			</div>
			<div class="pac-content">
				<?php if ( isset( $imageData[ 0 ][ 'id' ] ) && ! empty( $imageData[ 0 ][ 'id' ] ) ) { ?>
					<div class="pac-image-wrapper">
						<?php echo wp_kses( wp_get_attachment_image( $imageData[ 0 ][ 'id' ], $imageSize ), 'allow_image_html' ); ?>
					</div>
				<?php } ?>
				<div class="pac-text-wrapper">
					<div class="pac-text">
						<?php if ( $leadTitle ) { ?>
							<h2 class="pac-title"><?php echo esc_html( $leadTitle ); ?></h2>
						<?php } ?>
						<?php if ( $desc ) { ?>
							<div class="pac-description-wrapper">
								<div class="pac-description">
									<?php echo wp_kses_post( apply_shortcodes( $desc ) ); ?>
								</div>
							</div>
						<?php } ?>
					</div>
					<?php if ( $buttonTitle && $buttonLink ) {
						/**
						 * Note to reviewer: $rel_safe variable stores properly escaped values and does not need
						 * to be escaped here.
						 */
						?>
						<div class="pac-sticky-btn pac-btn">
							<a href="<?php echo esc_url( $buttonLink ); ?>"<?php echo esc_attr( $target ); ?><?php echo esc_attr( $rel_safe ); ?>><?php echo esc_html( $buttonTitle ); ?></a>
						</div>
					<?php } ?>
				</div>
			</div>
		</div>
		<?php if ( $displayCredits ) { ?>
			<span class="pac_affiliate">
                <?php esc_html_e( 'Powered By', 'pop-and-convert' ); ?>
                <a href="<?php echo esc_url( $affiliateLink ?? 'https://popandconvert.com/' ); ?>"
				   rel="nofollow">
                    <?php echo wp_kses( pop_and_convert_get_svg( 'affiliate_icon' ), 'allow_svg_html' ); ?>
                </a>
            </span>
		<?php } ?>
	</div>
	<?php
}

/**
 * Retrieve markup for Notification overlay layout
 *
 * @param string $notificationLayout
 * @param string $class
 * @param string $desc
 * @param array $imageData
 * @param string $imageSize
 * @param string $leadTitle
 * @param string $buttonTitle
 * @param url $buttonLink
 * @param string $target
 * @param string $rel_safe
 * @param boolean $displayCredits
 * @param url $affiliateLink
 *
 * @return html
 */
function pop_and_convert_get_popup(
	$notificationLayout,
	$class,
	$desc,
	$imageData,
	$imageSize,
	$leadTitle,
	$buttonTitle,
	$buttonLink,
	$target,
	$rel_safe,
	$displayCredits,
	$affiliateLink
) {
	?>
	<dialog id="pac_popup" class="pac_popup">
		<div class="pac_popup__action-wrapper">
			<div class="pac_popup__actions">
				<?php if ( $notificationLayout === 'popup-layout-3' && $desc ) { ?>
					<button class="pac_popup-btn pac_popup-btn--hide" aria-expanded="true"
							aria-controls="pac_popup__description">
						<?php echo wp_kses( pop_and_convert_get_svg( 'down-arrow' ), 'allow_svg_html' ); ?>
					</button>
				<?php } ?>
				<button class="pac_popup-btn pac_popup-btn--cross" onclick="this.closest('dialog').close('close')">
					<?php echo wp_kses( pop_and_convert_get_svg( 'cross' ), 'allow_svg_html' ); ?>
				</button>
			</div>
		</div>
		<div class="pac_popup__content-wrapper <?php echo esc_attr( $class ); ?>">
			<?php if ( $notificationLayout !== 'popup-layout-3' ) { ?>
				<?php if ( isset( $imageData[ 0 ][ 'id' ] ) && ! empty( $imageData[ 0 ][ 'id' ] ) ) { ?>
					<div class="pac_popup__image">
						<?php echo wp_kses( wp_get_attachment_image( $imageData[ 0 ][ 'id' ], $imageSize ), 'allow_image_html' ); ?>
					</div>
				<?php } ?>
			<?php } ?>
			<div class="pac_popup__content">
				<?php if ( $leadTitle ) { ?>
					<h2 class="pac_popup__title"><?php echo esc_html( $leadTitle ); ?></h2>
				<?php } ?>
				<?php if ( $desc ) { ?>
					<div class="pac_popup__description" aria-hidden="false">
						<div>
							<?php echo wp_kses_post( apply_shortcodes( $desc ) ); ?>
						</div>
					</div>
				<?php }

				if ( $buttonLink && $buttonTitle ) {
					/**
					 * Note to reviewer: $rel_safe variable stores properly escaped values and does not need
					 * to be escaped here.
					 */
					?>
					<div class="pac_popup__button pac-btn">
						<a href="<?php echo esc_url( $buttonLink ); ?>"<?php echo esc_attr( $target ); ?><?php echo $rel_safe; ?>><?php echo esc_html( $buttonTitle ); ?></a>
					</div>
				<?php }
				if ( $notificationLayout === 'popup-layout-3' && $displayCredits ) { ?>
					<span class="pac_affiliate">
                        <?php esc_html_e( 'Powered By', 'pop-and-convert' ); ?>
                        <a href="<?php echo esc_url( $affiliateLink ?? 'https://popandconvert.com/' ); ?>"
						   rel="nofollow">
                            <?php echo wp_kses( pop_and_convert_get_svg( 'affiliate_icon' ), 'allow_svg_html' ); ?>
                        </a>
                    </span>
				<?php } ?>
			</div>
		</div>
		<?php if ( $notificationLayout === 'popup-layout-3' ) { ?>
			<?php if ( isset( $imageData[ 0 ][ 'id' ] ) && ! empty( $imageData[ 0 ][ 'id' ] ) ) { ?>
				<div class="pac_popup__image">
					<?php echo wp_kses( wp_get_attachment_image( $imageData[ 0 ][ 'id' ], $imageSize ), 'allow_image_html' ); ?>
				</div>
			<?php } ?>
		<?php }
		if ( $notificationLayout !== 'popup-layout-3' && $displayCredits ) { ?>
			<span class="pac_affiliate">
                <?php esc_html_e( 'Powered By', 'pop-and-convert' ); ?>
                <a href="<?php echo $affiliateLink ? esc_url( $affiliateLink ) : esc_url( 'https://popandconvert.com/' ); ?>"
				   rel="nofollow">
                    <?php echo wp_kses( pop_and_convert_get_svg( 'affiliate_icon' ), 'allow_svg_html' ); ?>
                </a>
            </span>
		<?php } ?>
	</dialog>
	<?php
}

/**
 * Compare two arrays and return the saved value from database
 *
 * @return array
 */
function pop_and_convert_get_saved_roles() {
	$default     = \Pop_And_Convert\Pop_And_Convert::get_default_global_setting();
	$getSettings = get_option( 'pop_and_convert_global_settings', $default );

	if ( isset( $getSettings[ 'userRoles' ] ) ) {
		$savedRoles = $getSettings[ 'userRoles' ];

		$allRoles = \Pop_And_Convert\Pop_And_Convert::get_user_roles();

		// Get the values from the roles array
		$roleValues = array_values( $allRoles );

		// Find the intersection of the saved roles and the role values
		$intersect = array_intersect( $savedRoles, $roleValues );

		// Get the keys for the intersecting values
		$keys = [];
		foreach ( $intersect as $role ) {
			$keys[] = array_search( $role, $allRoles );
		}

		return $keys;
	} else {
		return [ 'administrator' ];
	}

}

/**
 * Returns JavaScript data in a string format to be used inline for individual notifications.
 *
 * @param array $array An array of dynamic variables encoded in wp_json_encode
 *
 * @return string
 */
function pop_and_convert_print_inline_js( $array ) {

	$store_js_in_string = '
        // Define a function that takes a string as an argument
        function timeToSecond(str) {
            // Use a regular expression to extract the number and the unit from the string
            let regex = /(\d+)(hour|min|sec)/;
            let match = str.match(regex);
            // If there is a match, convert the number to an integer and the unit to a lowercase string
            if (match) {
                let number = parseInt(match[1]);
                let unit = match[2].toLowerCase();
                // Declare a variable to store the result
                let second;
                // Use a switch statement to handle different units
                switch (unit) {
                    // If the unit is hour, multiply the number by 3600
                    case "hour":
                        second = number * 3600;
                        break;
                    // If the unit is min, multiply the number by 60
                    case "min":
                        second = number * 60;
                        break;
                    // If the unit is sec, assign the number to the result
                    case "sec":
                        second = number;
                        break;
                    // If the unit is not recognized, return an error message
                    default:
                        return "Invalid unit";
                }
                // Return the result in seconds
                return second;
            }
            // If there is no match, return an error message
            else {
                return "Invalid input";
            }
        }

        const pacAnalytic = () => {
            const pacNotifi = document.querySelector("#pop-and-convert-frontend .pac-notification");
            const pacId = pacNotifi.getAttribute("data-id");
            const url = ' . $array[ 'endpointURL' ] . ' + "/pop-and-convert/v1/notifications-stats/" + pacId;
            let jsonData;
            async function getCurrentViews() {
                try {
                    const response = await fetch(url);
                    jsonData = await response.json();
                    return jsonData.views ? jsonData.views : 0;
                } catch (error) {
                    console.error("Error fetching views:", error);
                    return 0;
                }
            }

            async function updateViews() {
                try {
                    const currentViews = await getCurrentViews();
                    const updatedData = {
                        ...jsonData,
                        views: currentViews + 1
                    }
                    const response = await fetch(url, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedData)
                    })
                }
                catch(error) {
                    console.error("Error Updating Views:", error)
                }
            }
            updateViews()
        }

        const pacNotifi = document.querySelector("#pop-and-convert-frontend .pac-notification");
        const pacId = pacNotifi.getAttribute("data-id");
        const pac_popup = document.getElementById("pac_popup");
        const popupNotifi = document.querySelector("#pop-and-convert-frontend .popup");
        let pacClosedTime = localStorage.getItem("pacClosedTime"+"-"+pacId);

        const hideOnM = pacNotifi.getAttribute("data-m") === "no" ? true : false;
        const hideOnT = pacNotifi.getAttribute("data-t") === "no" ? true : false;
        const hideOnD = pacNotifi.getAttribute("data-d") === "no" ? true : false;

        function popupVisibility () {
            if ( hideOnM && window.innerWidth < 568 ) {
                pac_popup.close();
            } else if (hideOnT && window.innerWidth > 567 && window.innerWidth < 769) {
                pac_popup.close();
            } else if (hideOnD && window.innerWidth > 769) {
                pac_popup.close();
            } else {
                if (pac_popup !== null) popupNotifi.classList.contains("popup-layout-3") ?
                pac_popup.show() : pac_popup.showModal();
            }
        }
        
        if(pacClosedTime !== null){
            let currentTime = new Date().getTime()
            let remainingTime = Math.max(0, pacClosedTime - currentTime)

            setTimeout(() => {
                let pac_wrapper = document.querySelector("#pop-and-convert-frontend");
                pac_wrapper.style.display="block";
                localStorage.removeItem("pacClosedTime"+"-"+pacId)
            }, remainingTime);
        } else {
            if (' . $array[ 'encodeTrigger' ] . ' === "onpageload"){
                setTimeout(() => {
                    let pac_wrapper = document.querySelector("#pop-and-convert-frontend");
                    pac_wrapper.style.display="block";

                    popupVisibility()
                    
                    if (!' . $array['checkID'] . ' && !' . $array['loggedIn'] . ') pacAnalytic()
                }, timeToSecond(' . $array['encodeDelay']. ')*1000);
            } else {
                let pac_wrapper = document.querySelector("#pop-and-convert-frontend");
                let funcCalled = false;
                document.addEventListener("mousemove", (e) => {
                    //Get the cursor\'s y position
                    let y = e.clientY;
                    // Check if the cursor is within 10 pixels from the top edge of the window
                    if ( y <= 10 && !funcCalled){
                        pac_wrapper.style.display="block";
                        if (!' . $array[ 'checkID' ] . ' && !' . $array[ 'loggedIn' ] . ' ) pacAnalytic();
                        funcCalled = true;
                    }
                });
            }
        }
    ';

	return $store_js_in_string;
}

/**
 * Return allowed HTML for img tag
 */
function pop_and_convert_sanitize_image() {
	$kses_defaults = wp_kses_allowed_html( 'post' );

	$image_args = array(
		'img' => array(
			'class'    => true,
			'src'      => true,
			'srcset'   => true,
			'decoding' => true,
			'alt'      => true,
			'width'    => true,
			'height'   => true,
			'loading'  => true,
			'sizes'    => true,
		),
	);

	return array_merge( $kses_defaults, $image_args );
}

/**
 * Return allowed HTML for svg tag
 */
function pop_and_convert_sanitize_svg() {
	$kses_defaults = wp_kses_allowed_html( 'post' );

	$svg_args = array(
		'svg'   => array(
			'class'           => true,
			'aria-hidden'     => true,
			'aria-labelledby' => true,
			'role'            => true,
			'xmlns'           => true,
			'width'           => true,
			'height'          => true,
			'viewbox'         => true, // <= Must be lower case!
		),
		'g'     => array( 'fill' => true ),
		'title' => array( 'title' => true ),
		'path'  => array(
			'd'              => true,
			'fill'           => true,
			'stroke'         => true,
			'strokewidth'    => true,
			'strokelinecap'  => true,
			'strokelinejoin' => true,
		),
	);

	return array_merge( $kses_defaults, $svg_args );
}
