#include <bits/stdc++.h>
using namespace std;

int t_time = 5, p_time = 4, c_time = 10;
int t_e = 1500, p_e = 1000, c_e = 3000;
vector<vector<int>> ans;

void f(int t, int p, int c, int cur_e, int e, int n, int cur_t)
{
    if (cur_e > e)
    {
        return;
    }
    if (cur_e == e)
    {
        ans.push_back({t, p, c});
        return;
    }
    if ((cur_t + t_time) < n)
    {
        f(t + 1, p, c, cur_e + t_e * (n - t_time - cur_t), e, n, cur_t + t_time);
    }
    if ((cur_t + p_time) < n)
    {
        f(t, p + 1, c, cur_e + p_e * (n - p_time - cur_t), e, n, cur_t + p_time);
    }
    if ((cur_t + c_time) < n)
    {
        f(t, p, c + 1, cur_e + c_e * (n - c_time - cur_t), e, n, cur_t + c_time);
    }
}

void maxProfit()
{
    int n, e;
    cin >> n >> e;

    f(0, 0, 0, 0, e, n, 0);

    for (auto i : ans)
    {
        cout << i[0] << " " << i[1] << " " << i[2] << endl;
    }
}

int main()
{
    maxProfit();
    return 0;
}