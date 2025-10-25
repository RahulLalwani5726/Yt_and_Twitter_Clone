import {userRegister} from "./User/Register.js"
import {userLogin} from "./User/Login.js"
import {userLogout} from "../controllers/User/Logout.js"
import {refreshAccessToken} from "../controllers/User/RefreshAcessToken.js"
import {changePassword} from "./User/ChangePassword.js"
import {updateField} from "./User/UpdateFields.js"
import {updateAvatar} from "./User/updateFiles.js"
import {updateCoverImage} from "./User/updateFiles.js"
import {getCurrentUser} from "./User/getCurrentUser.js"
import {getUserChannelProfile} from "./User/getUserChannelProfile.js"
import {getWatchHistory} from "./User/getWatchHistory.js"

export{
    userRegister,
    userLogin,
    userLogout,
    refreshAccessToken,
    changePassword,
    updateField,
    updateAvatar,
    updateCoverImage,
    getCurrentUser,
    getUserChannelProfile,
    getWatchHistory,
}