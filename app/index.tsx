import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
} from 'react-native';

// ── ダミーデータ ──────────────────────────────────────────
const POOL_DATA = [
  { name: '証券口座',   color: '#0C447C', amount: '¥300万', ratio: 0.387 },
  { name: '定期預金',   color: '#185FA5', amount: '¥250万', ratio: 0.323 },
  { name: '積立NISA',  color: '#378ADD', amount: '¥100万', ratio: 0.129 },
  { name: 'メイン銀行', color: '#85B7EB', amount: '¥80万',  ratio: 0.103 },
  { name: 'サブ銀行',  color: '#B5D4F4', amount: '¥45万',  ratio: 0.058 },
];

const PF_DATA = [
  { name: '教育PJ', color: '#0C447C', amount: '¥300万', ratio: 0.387 },
  { name: '老後PJ', color: '#1D9E75', amount: '¥250万', ratio: 0.323 },
  { name: '車PJ',   color: '#888780', amount: '¥100万', ratio: 0.129 },
  { name: 'その他', color: '#534AB7', amount: '¥115万', ratio: 0.148 },
  { name: '旅行PJ', color: '#EF9F27', amount: '¥10万',  ratio: 0.013 },
];

type Page = 'home' | 'pool' | 'pf';

// ── 共通パーツ ────────────────────────────────────────────

/** ドーナツグラフの代替：横セグメントバー */
function SegmentBar({ data }: { data: typeof POOL_DATA }) {
  return (
    <View style={styles.segmentBar}>
      {data.map((item, i) => (
        <View
          key={i}
          style={{ flex: item.ratio, backgroundColor: item.color, height: '100%' }}
        />
      ))}
    </View>
  );
}

function LegendRow({ name, color, amount }: { name: string; color: string; amount: string }) {
  return (
    <View style={styles.legendRow}>
      <View style={styles.legendLeft}>
        <View style={[styles.legendDot, { backgroundColor: color }]} />
        <Text style={styles.legendName} numberOfLines={1}>{name}</Text>
      </View>
      <Text style={styles.legendVal}>{amount}</Text>
    </View>
  );
}

// ── サブ画面：プール金 / ポートフォリオ ──────────────────

function ListPage({
  title,
  sub,
  total,
  countLabel,
  countValue,
  data,
  onBack,
}: {
  title: string;
  sub: string;
  total: string;
  countLabel: string;
  countValue: string;
  data: typeof POOL_DATA;
  onBack: () => void;
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0C447C" />
      <View style={styles.listHeader}>
        <Pressable onPress={onBack}>
          <Text style={styles.backBtn}>← ホーム</Text>
        </Pressable>
        <Text style={styles.listTitle}>{title}</Text>
        <Text style={styles.listSub}>{sub}</Text>
        <View style={styles.listTotalRow}>
          <View>
            <Text style={styles.listTotalLabel}>合計</Text>
            <Text style={styles.listTotal}>{total}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.listTotalLabel}>{countLabel}</Text>
            <Text style={styles.listSub2}>{countValue}</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.listScroll} contentContainerStyle={{ padding: 14, paddingBottom: 30 }}>
        {data.map((item, i) => (
          <View key={i} style={styles.itemCard}>
            <View style={styles.itemTop}>
              <View style={styles.itemNameRow}>
                <View style={[styles.itemDot, { backgroundColor: item.color }]} />
                <Text style={styles.itemNameText}>{item.name}</Text>
              </View>
              <Text style={styles.itemAmt}>{item.amount}</Text>
            </View>
            <View style={styles.itemBarBg}>
              <View
                style={[
                  styles.itemBarFill,
                  { width: `${Math.round(item.ratio * 100)}%` as `${number}%`, backgroundColor: item.color },
                ]}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// ── メイン画面：ホーム ────────────────────────────────────

export default function HomeScreen() {
  const [page, setPage] = useState<Page>('home');

  if (page === 'pool') {
    return (
      <ListPage
        title="プール金"
        sub="実際の口座残高の一覧"
        total="¥7,750,000"
        countLabel="口座数"
        countValue="5口座"
        data={POOL_DATA}
        onBack={() => setPage('home')}
      />
    );
  }

  if (page === 'pf') {
    return (
      <ListPage
        title="ポートフォリオ"
        sub="用途別プロジェクトの一覧"
        total="¥7,750,000"
        countLabel="プロジェクト"
        countValue="5PJ"
        data={PF_DATA}
        onBack={() => setPage('home')}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0C447C" />

      {/* ヘッダー */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.logoText}>ツカイドキ</Text>
          <Text style={styles.headerSub}>総資産</Text>
          <Text style={styles.headerTotal}>¥7,750,000</Text>
          <Text style={styles.headerNote}>プール金・ポートフォリオ 両方の合計</Text>
        </View>
        <Pressable style={styles.menuBtn} onPress={() => console.log('menu pressed')}>
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </Pressable>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>

        {/* 一致バー */}
        <View style={styles.matchBar}>
          <View style={styles.matchDot}>
            <Text style={styles.matchDotText}>✓</Text>
          </View>
          <View>
            <Text style={styles.matchTxt}>プール金 ＝ ポートフォリオ　一致</Text>
            <Text style={styles.matchSub}>差額 ¥0 · 記録は整合しています</Text>
          </View>
        </View>

        {/* チャートカード（2列） */}
        <View style={styles.dualChart}>
          {/* プール金 */}
          <Pressable style={styles.chartCard} onPress={() => setPage('pool')}>
            <Text style={styles.tapIndicator}>›</Text>
            <Text style={styles.chartLabel}>
              プール金{'  '}
              <Text style={[styles.chartBadge, styles.badgeBlue]}>口座別</Text>
            </Text>
            <SegmentBar data={POOL_DATA} />
            <Text style={styles.chartTotal}>¥775万</Text>
            <Text style={styles.chartTotalSub}>5口座</Text>
            <View>
              {POOL_DATA.map((item, i) => (
                <LegendRow key={i} name={item.name} color={item.color} amount={item.amount} />
              ))}
            </View>
          </Pressable>

          {/* ポートフォリオ */}
          <Pressable style={styles.chartCard} onPress={() => setPage('pf')}>
            <Text style={styles.tapIndicator}>›</Text>
            <Text style={styles.chartLabel}>
              ポートフォリオ{'  '}
              <Text style={[styles.chartBadge, styles.badgeGreen]}>用途別</Text>
            </Text>
            <SegmentBar data={PF_DATA} />
            <Text style={styles.chartTotal}>¥775万</Text>
            <Text style={styles.chartTotalSub}>5PJ</Text>
            <View>
              {PF_DATA.map((item, i) => (
                <LegendRow key={i} name={item.name} color={item.color} amount={item.amount} />
              ))}
            </View>
          </Pressable>
        </View>

        {/* 差額カード */}
        <View style={styles.diffCard}>
          <View style={styles.diffRow}>
            <Text style={styles.diffLabel}>プール金 合計</Text>
            <Text style={[styles.diffVal, styles.diffValBig]}>¥7,750,000</Text>
          </View>
          <View style={styles.diffRow}>
            <Text style={styles.diffLabel}>ポートフォリオ 合計</Text>
            <Text style={[styles.diffVal, styles.diffValBig]}>¥7,750,000</Text>
          </View>
          <View style={[styles.diffRow, styles.diffRowLast]}>
            <Text style={[styles.diffLabel, { color: '#1D9E75', fontWeight: '500' }]}>差額</Text>
            <Text style={[styles.diffVal, { color: '#1D9E75' }]}>¥0 ✓</Text>
          </View>
        </View>

        {/* 安心ラインカード */}
        <View style={styles.safeCard}>
          <Text style={styles.safeLabel}>今月の安心ライン</Text>
          <Text style={styles.safeAmt}>¥87,000</Text>
          <Text style={styles.safeNote}>全プロジェクト計画達成後の余力。この範囲なら自由に使えます。</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ── スタイル ──────────────────────────────────────────────
const BLUE = '#0C447C';
const GREEN = '#1D9E75';
const BG_PRIMARY = '#ffffff';
const BG_SECONDARY = '#f5f4ee';
const TEXT_PRIMARY = '#2c2c2a';
const TEXT_SECONDARY = '#73726c';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BLUE,
  },
  scroll: {
    flex: 1,
    backgroundColor: BG_SECONDARY,
  },
  scrollContent: {
    paddingBottom: 24,
  },

  // ── ヘッダー
  header: {
    backgroundColor: BLUE,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: { flex: 1 },
  logoText: { fontSize: 14, fontWeight: '700', color: '#fff', marginBottom: 6 },
  headerSub: { fontSize: 10, color: 'rgba(255,255,255,0.65)' },
  headerTotal: { fontSize: 24, fontWeight: '500', color: '#fff', lineHeight: 28, marginTop: 1 },
  headerNote: { fontSize: 9, color: 'rgba(255,255,255,0.5)', marginTop: 1 },
  menuBtn: {
    width: 28,
    height: 28,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginTop: 4,
    paddingVertical: 4,
  },
  menuLine: { width: 16, height: 1.5, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 1 },

  // ── 一致バー
  matchBar: {
    margin: 8,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF3DE',
    gap: 9,
  },
  matchDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchDotText: { color: '#fff', fontSize: 11, fontWeight: '500' },
  matchTxt: { color: '#27500A', fontSize: 11, fontWeight: '500' },
  matchSub: { fontSize: 9, color: '#3B6D11', marginTop: 1 },

  // ── チャートカード
  dualChart: {
    flexDirection: 'row',
    gap: 7,
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 6,
  },
  chartCard: {
    flex: 1,
    backgroundColor: BG_PRIMARY,
    borderRadius: 12,
    padding: 8,
  },
  tapIndicator: {
    position: 'absolute',
    top: 6,
    right: 7,
    fontSize: 10,
    color: TEXT_SECONDARY,
  },
  chartLabel: { fontSize: 10, color: TEXT_SECONDARY, marginBottom: 6 },
  chartBadge: { fontSize: 8, borderRadius: 10 },
  badgeBlue: { backgroundColor: '#E6F1FB', color: BLUE },
  badgeGreen: { backgroundColor: '#EAF3DE', color: '#27500A' },

  // セグメントバー（ドーナツ代替）
  segmentBar: {
    height: 10,
    borderRadius: 5,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 6,
  },

  chartTotal: { fontSize: 12, fontWeight: '500', color: TEXT_PRIMARY, textAlign: 'center' },
  chartTotalSub: { fontSize: 8, color: TEXT_SECONDARY, textAlign: 'center', marginBottom: 4 },

  // レジェンド
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 1.5,
  },
  legendLeft: { flexDirection: 'row', alignItems: 'center', gap: 4, flex: 1 },
  legendDot: { width: 6, height: 6, borderRadius: 3 },
  legendName: { fontSize: 9, color: TEXT_SECONDARY, flex: 1 },
  legendVal: { fontSize: 9, fontWeight: '500', color: TEXT_PRIMARY },

  // ── 差額カード
  diffCard: {
    marginHorizontal: 14,
    marginBottom: 8,
    backgroundColor: BG_PRIMARY,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  diffRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  diffRowLast: { borderBottomWidth: 0 },
  diffLabel: { fontSize: 11, color: TEXT_SECONDARY },
  diffVal: { fontSize: 11, fontWeight: '500', color: TEXT_PRIMARY },
  diffValBig: { fontSize: 13, color: BLUE },

  // ── 安心ラインカード
  safeCard: {
    marginHorizontal: 14,
    backgroundColor: '#EAF3DE',
    borderRadius: 12,
    padding: 10,
    paddingHorizontal: 12,
  },
  safeLabel: { fontSize: 10, color: '#27500A', marginBottom: 2 },
  safeAmt: { fontSize: 20, fontWeight: '500', color: '#173404', lineHeight: 24 },
  safeNote: { fontSize: 9, color: '#3B6D11', marginTop: 2, lineHeight: 14 },

  // ── リスト画面共通
  listHeader: {
    backgroundColor: BLUE,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
  },
  backBtn: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 6 },
  listTitle: { fontSize: 15, fontWeight: '500', color: '#fff', marginBottom: 1 },
  listSub: { fontSize: 10, color: 'rgba(255,255,255,0.6)' },
  listTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  listTotal: { fontSize: 20, fontWeight: '500', color: '#fff', lineHeight: 24 },
  listTotalLabel: { fontSize: 9, color: 'rgba(255,255,255,0.55)' },
  listSub2: { fontSize: 14, fontWeight: '500', color: '#fff' },
  listScroll: { flex: 1, backgroundColor: BG_SECONDARY },

  // アイテムカード
  itemCard: {
    backgroundColor: BG_PRIMARY,
    borderRadius: 12,
    padding: 10,
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  itemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  itemNameRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  itemDot: { width: 10, height: 10, borderRadius: 5 },
  itemNameText: { fontSize: 12, fontWeight: '500', color: TEXT_PRIMARY },
  itemAmt: { fontSize: 14, fontWeight: '500', color: TEXT_PRIMARY },
  itemBarBg: {
    backgroundColor: BG_SECONDARY,
    borderRadius: 4,
    height: 3,
    overflow: 'hidden',
    marginTop: 6,
  },
  itemBarFill: { height: '100%', borderRadius: 4 },
});
