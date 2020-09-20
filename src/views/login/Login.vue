<template>
  <section class='login-wrapper'>
    <div class="inner">
      <div class="title">后台管理系统</div>
      <a-form :form="form" class="login-form" @submit="handleSubmit">
        <a-form-item>
          <a-input v-decorator="['username', rules.username]" placeholder="账号" autocomplete="off">
            <a-icon class="a-icon" slot="prefix" type="user" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input v-decorator="['password', rules.password]" type="password" placeholder="密码" autocomplete="off">
            <a-icon class="a-icon" slot="prefix" type="lock" />
          </a-input>
        </a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button" block>登录</a-button>
      </a-form>
    </div>
  </section>
</template>
<script>
import { login } from '@/api/mi'
import { mapMutations } from 'vuex'
import { setToken } from '@/utils/token'

export default {
  name: 'Login',
  data () {
    return {
      // 用 createForm 创建表单 this.$form.createForm(this, { name: 'login' })
      // name: 'login' 的意思是会创建表单生成ID的时候加个前缀, 防止ID重复, 效果如: id="login_user", 不加则为: id="user"
      form: this.$form.createForm(this),
      rules: {
        username: { rules: [{ required: true, message: '账号不能为空!' }] },
        password: { rules: [{ required: true, message: '密码不能为空!' }] }
      }
    }
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (err) return false
        login(values).then(res => {
          const { status, msg, data } = res
          if (status !== 200) {
            this.$message.warning(msg)
            return false
          }
          this.setUserInfo(data)
          setToken(data.token)
          this.$router.push('home')
        })
      })
    }
  }
}
</script>
<style lang='less' scoped>
.login-wrapper {
  width: 100%;
  height: 100%;
  background: url('~@/assets/image/login/login-bj.jpg') no-repeat center center;
  background-size: auto;
  .inner {
    position: relative;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    max-width: 380px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
  }
  .title {
    font-size: 22px;
    color: @primary-color;
    text-align: center;
    line-height: 52px;
    background-color: @login-title-color-bj;
  }
  .login-form {
    padding: 20px;
  }
}
.a-icon {
  color: rgba(0, 0, 0, 0.25);
}
</style>
