# Quy trình làm việc của nhóm (Team Workflow) – BadminBookingHub


## 1. Năm nguyên tắc bắt buộc

1. **Không push trực tiếp lên `main`.** Mọi thay đổi (code, tài liệu PA, weekly report, README…) đều đi qua **Pull Request (PR)**. Nhánh `main` đã được bảo vệ (protected), nên lệnh push thẳng lên `main` sẽ bị GitHub từ chối. Đây là yêu cầu của môn học (*"no direct pushes to main"*, mục Git usage chiếm 40% điểm Teamwork).
2. **Có task rồi mới làm.** Mọi việc đều có một task trên GitHub Projects, có người phụ trách (Assignee) và hạn chót (Due date). Không có task thì báo PM tạo trước.
3. **Mỗi PR cần ít nhất 1 thành viên khác review và Approve** thì mới được merge. Không ai tự approve PR của mình.
4. **Commit message theo Conventional Commits** (`feat:`, `fix:`, `docs:`, `test:`…). Xem mục 6.
5. **Không commit bí mật**: file `.env`, API key, mật khẩu, connection string có mật khẩu. Nếu lỡ commit thì báo PM ngay (mục 10).

---

## 2. Công cụ và vai trò của từng công cụ

| Công cụ | Dùng để | Không dùng để |
|---|---|---|
| **GitHub Projects** (task board) | Biết *ai làm gì, đến khi nào, đang ở trạng thái nào*. Đây là nơi duy nhất ghi nhận việc được giao. | Thảo luận dài |
| **GitHub repo** `badminbookinghub-team/BadminBookingHub` | Lưu code và tài liệu, mở PR, review code | Lưu file nháp hay file cá nhân |
| **Discord** (kênh của nhóm, có TA) | Trao đổi nhanh, hỏi đáp, báo blocker, nhắc review, họp online | Giao task chính thức (task phải nằm trên board). Gửi file chính thức (file phải nằm trong repo). |


## 3. Vòng đời của một task trên board

```
Backlog ──► Todo ──► In Progress ──► In Review ──► Done


| Cột | Ý nghĩa | Ai chuyển |
|---|---|---|
| **Backlog** | Việc đã biết nhưng chưa lên lịch | PM |
| **Todo** | Đã giao người, có Due date, đến lượt làm | PM |
| **In Progress** | Đang làm. Mỗi người tối đa **2 task** ở cột này cùng lúc. | Người được giao |
| **In Review** | Đã mở PR, đang chờ review | Người được giao |
| **Done** | PR đã merge vào `main`, issue đã đóng | Tự động |

---

## 4. Quy trình từng bước: từ nhận task đến merge vào `main`

### Bước 0 – Thiết lập một lần duy nhất

```bash
git clone https://github.com/badminbookinghub-team/BadminBookingHub.git
cd BadminBookingHub

# Tên và email phải trùng với tài khoản GitHub, nếu không commit sẽ KHÔNG được tính cho bạn
git config user.name  "Tên GitHub của bạn"
git config user.email "email-đã-đăng-ký-với-GitHub"
```

### Bước 1 – Nhận task

1. Mở GitHub Projects, chọn view **My tasks** (hoặc lọc `assignee:@me`).
2. Chọn task ở cột **Todo** có Due date gần nhất hoặc Priority cao nhất.
3. Đọc mô tả và **Acceptance criteria** (tiêu chí hoàn thành). Chưa rõ chỗ nào thì hỏi ngay trong comment của issue hoặc ở `#dev`.
4. Kéo task sang **In Progress**.

### Bước 2 – Tạo nhánh từ `main` mới nhất

```bash
git switch main
git pull origin main
git switch -c feat/12-booking-form
```

**Cách đặt tên nhánh:** `<loại>/<số-issue>-<mô-tả-ngắn-không-dấu>`

| Loại | Khi nào | Ví dụ |
|---|---|---|
| `feat/` | Tính năng mới | `feat/12-booking-form` |
| `fix/` | Sửa lỗi | `fix/31-double-booking` |
| `docs/` | Tài liệu, PA, weekly report | `docs/20-pa2-use-cases`, `docs/w04-status` |
| `test/` | Test case, unit test, automation | `test/45-booking-unit-tests` |
| `refactor/` | Sửa cấu trúc code, không đổi hành vi | `refactor/50-booking-service` |
| `chore/` | Cấu hình, CI, dependency | `chore/40-setup-ci` |

Mỗi nhánh chỉ phục vụ **một task**. Không gộp nhiều task vào một nhánh.

### Bước 3 – Làm việc và commit

```bash
git add <file>
git commit -m "feat(booking): add court selection form"
```

- Commit **nhỏ và thường xuyên**, mỗi commit là một thay đổi có ý nghĩa. Tránh một commit khổng lồ vào cuối ngày "tất cả mọi thứ".
- Push nhánh lên GitHub ít nhất **một lần mỗi ngày làm việc** để có backup và lịch sử đều đặn:

```bash
git push -u origin feat/12-booking-form   # lần đầu
git push                                  # các lần sau
```

### Bước 4 – Mở Pull Request

1. Cập nhật nhánh với `main` mới nhất trước khi mở PR (xem mục 5 nếu bị conflict).
2. Trên GitHub, chọn **Compare & pull request**. Base là `main`, compare là nhánh của bạn.
3. **Tiêu đề PR** viết theo Conventional Commits: `feat(booking): court selection form (#12)`
4. **Mô tả PR** theo mẫu dưới đây (PM sẽ đặt mẫu này thành PR template mặc định):

```markdown
## Mô tả
<Thay đổi gì, vì sao>

## Task liên quan
Closes #12

## Cách kiểm tra
1. <Bước để reviewer chạy thử>
2. <Kết quả mong đợi>

## Ảnh chụp màn hình (nếu có UI)

## Checklist
- [ ] Đã tự review diff của mình
- [ ] Chạy được trên máy, không lỗi
- [ ] Đã thêm hoặc cập nhật test (nếu là code)
- [ ] Không có file .env, key, mật khẩu
- [ ] Đã ghi vào AI Usage Log nếu có dùng AI
```

> Dòng `Closes #12` **bắt buộc phải có**. Nhờ nó, issue tự đóng và card tự chuyển sang **Done** khi PR được merge vào `main`.

5. Bên phải: thêm **Reviewers** (ít nhất 2 người, ưu tiên người hiểu phần đó) và **Assignees** (chính bạn).
6. Kéo card sang **In Review**.
7. Gửi link PR vào `#pull-requests` trên Discord, tag reviewer.

Nếu muốn xin góp ý sớm khi chưa xong, mở **Draft pull request**. Khi xong thì bấm *Ready for review*.

### Bước 5 – Review

**Người review:**

- Review trong vòng **24 giờ** kể từ khi được nhờ.
- Đọc toàn bộ tab *Files changed*. Nếu là code thì checkout nhánh về chạy thử:
  ```bash
  git fetch origin
  git switch feat/12-booking-form
  ```
- Comment cụ thể vào từng dòng. Góp ý vào code, không nhắm vào người.
- Kết thúc review bằng một trong ba lựa chọn:
  - **Approve**: đạt, có thể merge.
  - **Request changes**: phải sửa mới merge được.
  - **Comment**: góp ý nhỏ, không chặn merge.

**Checklist cho người review:**

- [ ] Làm đúng và đủ Acceptance criteria của issue
- [ ] Chạy được, không phá tính năng cũ
- [ ] Đặt tên rõ ràng, theo convention của nhóm, không còn code thừa hay `console.log` debug
- [ ] Có test cho logic mới (từ PA5)
- [ ] Không có secret hay file rác (`node_modules`, file build, file cá nhân)
- [ ] Với tài liệu: đúng template của thầy, nhất quán với các PA trước

**Người tạo PR:**

- Sửa theo góp ý, commit thêm lên **cùng nhánh** rồi push. PR tự cập nhật, không cần mở PR mới.
- Trả lời từng comment, sau đó bấm **Resolve conversation**.
- Nhờ reviewer xem lại (nút ↻ *Re-request review*).

### Bước 6 – Merge

Chỉ merge khi **đủ cả** các điều kiện sau:

- ✅ Có ít nhất **2 Approve** từ thành viên khác
- ✅ Mọi conversation đã được resolve
- ✅ Không còn conflict với `main`
- ✅ CI chạy xanh (bắt buộc từ PA5, khi nhóm đã có CI)

**Ai bấm merge:** người tạo PR tự merge sau khi đã được approve.

**Cách merge:** chọn **Create a merge commit**. Không dùng *Squash* vì squash gộp hết commit lại thành một, làm mất lịch sử commit của từng người.

Sau khi merge, bấm **Delete branch** trên GitHub, rồi dọn dẹp ở máy:

```bash
git switch main
git pull origin main
git branch -d feat/12-booking-form
```

Card tự chuyển sang **Done**. Nếu card không tự chuyển thì kéo tay và báo PM.

---

## 5. Cập nhật nhánh và xử lý conflict

Khi `main` có thay đổi mới trong lúc bạn đang làm:

```bash
git switch feat/12-booking-form
git fetch origin
git merge origin/main
# nếu có conflict: mở file, sửa phần giữa <<<<<<< và >>>>>>>, rồi:
git add <file-đã-sửa>
git commit
git push
```

- Với file `.docx` (PA, weekly report), Git không tự gộp được. Vì vậy **mỗi file docx chỉ một người sửa tại một thời điểm**. Nếu cần nhiều người cùng viết một PA thì chia theo section trên Google Docs hoặc Word Online trước, sau đó một người tổng hợp và commit.
- Không dùng `git push --force` trên nhánh có người khác cùng làm. Nếu thật sự cần thì dùng `git push --force-with-lease` trên nhánh **của riêng bạn**.
- Bị kẹt với conflict quá 30 phút thì hỏi ở chat Discord.

---

## 6. Quy ước commit message (Conventional Commits)

```
<type>(<scope tùy chọn>): <mô tả ngắn, thì hiện tại, tiếng Anh, không viết hoa chữ đầu>
```

| Type | Dùng khi | Ví dụ |
|---|---|---|
| `feat` | Thêm tính năng | `feat(booking): allow choosing time slot` |
| `fix` | Sửa lỗi | `fix(auth): handle expired token` |
| `docs` | Tài liệu | `docs(pa2): add UC-03 specification` |
| `test` | Test | `test(booking): add BVA cases for slot length` |
| `refactor` | Đổi cấu trúc, không đổi hành vi | `refactor(court): extract pricing service` |
| `style` | Format, khoảng trắng | `style: run prettier` |
| `chore` | Cấu hình, dependency, CI | `chore(ci): run tests on pull requests` |

❌ Không viết: `update`, `fix bug`, `aaa`, `final`, `final2`.

---

## 7. Quy trình cho tài liệu (PA và weekly report)

Tài liệu cũng đi qua **nhánh, PR rồi review** giống hệt code.

| Loại | Vị trí trong repo | Tên nhánh mẫu |
|---|---|---|
| Bài nộp PA (PDF + file gốc) | `/pa/PA1` … `/pa/PA5`, tên file `<TeamID>-PAx.pdf` | `docs/pa3-submission` |
| Yêu cầu (SRS, use case, mockup) | `/docs/requirements` | `docs/20-srs-fr-list` |
| Thiết kế (C4, ADR, UML, UI) | `/docs/design` | `docs/33-adr-database` |
| Test plan, test case, test report | `/docs/test` | `test/41-test-cases-booking` |
| Weekly report | `/docs/management/weekly/W<tuần>-status.docx` | `docs/w05-status` |
| AI Usage Log | `/docs/ai-usage` | đi kèm PR của từng PA |

Lưu ý:

- **Weekly report:** PR phải được **merge trước deadline hằng tuần** của nhóm, vì giờ commit là bằng chứng nộp đúng hạn. **Không sửa lại report của các tuần trước.**
- **Deadline nội bộ của PA:** xong phần của mình **2 ngày trước** deadline Moodle để còn thời gian review và ghép bài.

---

## 8. Definition of Done: khi nào task được coi là xong

Một task chỉ là **Done** khi:

1. Đáp ứng hết Acceptance criteria ghi trong issue
2. Code hoặc tài liệu đã nằm trong `main` thông qua PR đã được approve
3. Có test đi kèm (với code từ PA5) và CI xanh
4. Issue đã đóng, card ở cột Done
5. Nếu có dùng AI thì đã ghi vào AI Usage Log

---

## 9. Giao tiếp và họp

- **Họp status hằng tuần:** mỗi người trả lời 3 câu: *Tuần qua làm gì? Tuần tới làm gì? Đang bị vướng gì?*. Cập nhật board **trước** buổi họp.
- **Vắng họp:** báo trước trong Discord. Việc vắng họp được ghi vào weekly report.
- **Quyết định quan trọng** (chọn công nghệ, đổi scope…): thảo luận trên Discord, nhưng **kết quả phải ghi lại** vào issue, ADR (`/docs/design`) hoặc weekly report. Tin nhắn Discord bị trôi, repo thì không.

---

## 10. Lỡ tay thì làm gì?

| Tình huống | Cách xử lý |
|---|---|
| Lỡ commit vào `main` ở máy (chưa push được vì bị chặn) | `git switch -c feat/<số>-<tên>` để mang commit sang nhánh mới, sau đó `git switch main` và `git reset --hard origin/main`, rồi push nhánh mới và mở PR |
| Lỡ commit `.env` hoặc key | Báo PM ngay. **Đổi (rotate) key đó** vì key đã lộ. Xóa file khỏi repo, thêm vào `.gitignore`. |
| Quên `Closes #số` trong PR | Sửa mô tả PR và thêm vào. Nếu PR đã merge thì đóng issue bằng tay và kéo card sang Done. |
| Không ai review PR sau 24 giờ | Nhắc lại ở `#pull-requests`. Sau 48 giờ thì báo PM để PM chỉ định người review. |
| Task lớn hơn dự tính | Comment vào issue, báo PM để tách task hoặc dời Due date. Đừng âm thầm trễ hạn. |

---

## 11. Bảng lệnh nhanh

```bash
# Bắt đầu task mới
git switch main && git pull origin main
git switch -c feat/<số-issue>-<mô-tả>

# Làm việc
git status
git add <file>
git commit -m "feat(scope): mô tả"
git push -u origin <tên-nhánh>

# Cập nhật nhánh với main
git fetch origin && git merge origin/main

# Sau khi PR được merge
git switch main && git pull origin main
git branch -d <tên-nhánh>
```

**Không bao giờ chạy:** `git push origin main`, hay `git push --force` lên nhánh chung.

---

## 12. Dùng AI trong dự án

- Được phép dùng AI (ChatGPT, Claude, Copilot…), nhưng **phải khai báo** trong AI Usage Log của từng PA: ai dùng, dùng tool gì, cho việc gì, và đã kiểm tra hay sửa kết quả thế nào.
- Bạn phải **giải thích được** mọi thứ mình commit. Thầy/TA có thể hỏi bất kỳ ai, về bất kỳ phần nào.
- Không đưa dữ liệu cá nhân hay dữ liệu bí mật vào công cụ AI.
